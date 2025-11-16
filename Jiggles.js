class JigglePhysics {
	constructor (runtime) {
		this.runtime = runtime;
		this.sprites = {};
	}

	getInfo() {
		return {
			id: 'jigglePhysics',
			name: 'Jiggle Physics',
			color1: '#ffcc00',
			color2: '#ffaa00',
			color3: '#ff8800',

			blocks: [
				{
					opcode: 'initSprite',
					blockType: Scratch.BlockType.COMMAND,
					text: 'initialize jiggle for sprite [SPRITE] stiffness [STIFFNESS] damping [DAMPING]',
					arguments: {
						SPRITE: { type: Scratch.ArgumentType.STRING, defaultValue: 'Sprite1' },
						STIFFNESS: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0.1 },
						DAMPING: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0.1 }
					}
				},
				{
					opcode: 'applyForce',
					blockType: Scratch.BlockType.COMMAND,
					text: 'apply force X [FORCEX] Y [FORCEY] to sprite [SPRITE]',
					arguments: {
						FORCEX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
						FORCEY: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
						SPRITE: { type: Scratch.ArgumentType.STRING, defaultValue: 'Sprite1' }
					}
				},
				{
					opcode: 'update',
					blockType: Scratch.BlockType.COMMAND,
					text: 'update jiggle for sprite [SPRITE]',
					arguments: {
						SPRITE: { type: Scratch.ArgumentType.STRING, defaultValue: 'Sprite1' }
					}
				},
				{
					opcode: 'getX',
					blockType: Scratch.BlockType.REPORTER,
					text: 'jiggle x of sprite [SPRITE]',
					arguments: {
						SPRITE: { type: Scratch.ArgumentType.STRING, defaultValue: 'Sprite1' }
					}
				},
				{
					opcode: 'getY',
					blockType: Scratch.BlockType.REPORTER,
					text: 'jiggle y of sprite [SPRITE]',
					arguments: {
						SPRITE: { type: Scratch.ArgumentType.STRING, defaultValue: 'Sprite1' }
					}
				}
			]
		};
	}

		// lazy init storage
		_ensureStorage() {
			if (!this.sprites) this.sprites = {};
		}

		// Find a runtime Target. Prefer util.target when available (block called
		// from a sprite). Otherwise search by name.
		_findTarget (name, util) {
			if (util && util.target) return util.target;
			// try several runtime locations (this.runtime when available, Scratch.vm.runtime, or window.vm.runtime)
			let runtime = this.runtime;
			if (!runtime) {
				if (typeof Scratch !== 'undefined' && Scratch.vm && Scratch.vm.runtime) runtime = Scratch.vm.runtime;
				else if (typeof window !== 'undefined' && window.vm && window.vm.runtime) runtime = window.vm.runtime;
			}
			if (!runtime || !name) return null;
			// Use getName() which Target implements
			for (const t of runtime.targets) {
				if (typeof t.getName === 'function' && t.getName() === name) return t;
			}
			return null;
		}

		initSprite(args, util) {
			this._ensureStorage();
			const name = args.SPRITE;
			const stiffness = Number(args.STIFFNESS) || 0.1;
			const damping = Number(args.DAMPING) || 0.1;
			const target = this._findTarget(name, util);
			let anchorX = 0;
			let anchorY = 0;
			if (target) {
				if (typeof target.x === 'number') anchorX = target.x;
				else if (typeof target.getXY === 'function') {
					const p = target.getXY();
					anchorX = p && typeof p.x === 'number' ? p.x : anchorX;
				}
				if (typeof target.y === 'number') anchorY = target.y;
				else if (typeof target.getXY === 'function') {
					const p = target.getXY();
					anchorY = p && typeof p.y === 'number' ? p.y : anchorY;
				}
			}
			// store by name (so scripts can reference by name) and also by target id
			this.sprites[name] = {
				position: { x: 0, y: 0 },
				velocity: { x: 0, y: 0 },
				stiffness,
				damping,
				anchor: { x: anchorX, y: anchorY },
				targetId: target ? target.id : null
			};
		}

		applyForce(args, util) {
			this._ensureStorage();
			const name = args.SPRITE;
			const fx = Number(args.FORCEX) || 0;
			const fy = Number(args.FORCEY) || 0;
			const s = this.sprites[name];
			// If not found by name, try util.target mapping
			const target = this._findTarget(name, util);
			const s2 = s || (target && target.getName && this.sprites[target.getName()]);
			if (s2) {
				s2.velocity.x += fx;
				s2.velocity.y += fy;
			}
		}

		update(args, util) {
			this._ensureStorage();
			const name = args.SPRITE;
			let s = this.sprites[name];
			const target = this._findTarget(name, util);
			if (!s && target && target.getName) {
				// try using target name
				const tname = target.getName();
				if (this.sprites[tname]) {
					// alias
					s = this.sprites[tname];
				}
			}
			if (!s) return;

			// simple spring-damper: a = -k * x - c * v
			const ax = -s.stiffness * s.position.x - s.damping * s.velocity.x;
			const ay = -s.stiffness * s.position.y - s.damping * s.velocity.y;

			// integrate (explicit Euler)
			s.velocity.x += ax;
			s.velocity.y += ay;
			s.position.x += s.velocity.x;
			s.position.y += s.velocity.y;

			// Apply to visible sprite if we have a target
			const realTarget = target || (this.runtime && this.runtime.targets && this.runtime.targets.find(t => t.id === s.targetId));
			if (realTarget) {
				const newX = (s.anchor ? s.anchor.x : 0) + s.position.x;
				const newY = (s.anchor ? s.anchor.y : 0) + s.position.y;
				if (typeof realTarget.setXY === 'function') {
					realTarget.setXY(newX, newY);
				} else {
					// best-effort fallback
					realTarget.x = newX;
					realTarget.y = newY;
				}
			}
		}

		getX(args, util) {
			this._ensureStorage();
			const name = args.SPRITE;
			const s = this.sprites[name] || (util && util.target && util.target.getName && this.sprites[util.target.getName()]);
			return s ? Number(s.position.x) : 0;
		}

		getY(args, util) {
			this._ensureStorage();
			const name = args.SPRITE;
			const s = this.sprites[name] || (util && util.target && util.target.getName && this.sprites[util.target.getName()]);
			return s ? Number(s.position.y) : 0;
		}
}

Scratch.extensions.register(new JigglePhysics());
