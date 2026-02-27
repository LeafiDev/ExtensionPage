class SpriteOverlay {
	constructor(runtime) {
		this.runtime = runtime;
		this.overlayCanvas = null;
		this.overlayCtx = null;
		this.sprites = {};
		this.isInitialized = false;
		this._initializeOverlay();
	}

	_initializeOverlay() {
		if (this.isInitialized) return;

		// Create overlay container
		const container = document.createElement('div');
		container.id = 'sprite-overlay-container';
		container.style.width = '100%';
		container.style.height = '100%';

		// Create overlay canvas
		this.overlayCanvas = document.createElement('canvas');
		this.overlayCanvas.id = 'sprite-overlay-canvas';
		this.overlayCanvas.style.width = '100%';
		this.overlayCanvas.style.height = '100%';
		this.overlayCanvas.style.pointerEvents = 'none';
		this.overlayCanvas.style.display = 'block';
		
		container.appendChild(this.overlayCanvas);
		
		// Add to Scratch renderer overlay
		if (Scratch.renderer && Scratch.renderer.addOverlay) {
			Scratch.renderer.addOverlay(container, 'scale');
		} else {
			document.body.appendChild(container);
		}
		
		this.overlayCtx = this.overlayCanvas.getContext('2d');
		this.isInitialized = true;

		// Handle canvas sizing
		const resizeCanvas = () => {
			this.overlayCanvas.width = container.clientWidth;
			this.overlayCanvas.height = container.clientHeight;
		};
		
		window.addEventListener('resize', resizeCanvas);
		resizeCanvas();
	}

	getInfo() {
		return {
			id: 'spriteOverlay',
			name: 'Sprite Overlay',
			color1: '#5b9bd5',
			color2: '#4a8cc8',
			color3: '#3979ba',
			menuIconURI: 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjE1MCIgaGVpZ2h0PSIxNzMuMzQzOTkiIHZpZXdCb3g9IjAgMCAxNTAgMTczLjM0Mzk5Ij48cmVjdCB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE3My4zNDM5OSIgZmlsbD0iIzViOWJkNSIvPjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjI1IiBmaWxsPSIjZmZmZmZmIi8+PHJlY3QgeD0iODAiIHk9IjMwIiB3aWR0aD0iNTAiIGhlaWdodD0iNDAiIGZpbGw9IiNmZmZmZmYiLz48cG9seWdvbiBwb2ludHM9IjUwLDEyMCA3MCwxNDAgMzAsMTQwIiBmaWxsPSIjZmZmZmZmIi8+PC9zdmc+',
			blocks: [
				{
					opcode: 'clearOverlay',
					blockType: Scratch.BlockType.COMMAND,
					text: 'clear overlay canvas',
				},
				{
					opcode: 'showOverlay',
					blockType: Scratch.BlockType.COMMAND,
					text: 'show overlay',
				},
				{
					opcode: 'hideOverlay',
					blockType: Scratch.BlockType.COMMAND,
					text: 'hide overlay',
				},
				{
					blockType: Scratch.BlockType.LABEL,
					text: 'Sprite Placement',
				},
				{
					opcode: 'addSprite',
					blockType: Scratch.BlockType.COMMAND,
					text: 'add sprite [SPRITENAME] as overlay sprite named [NAME]',
					arguments: {
						SPRITENAME: {
							type: Scratch.ArgumentType.STRING,
							defaultValue: 'Sprite1'
						},
						NAME: {
							type: Scratch.ArgumentType.STRING,
							defaultValue: 'overlay1'
						}
					}
				},
				{
					opcode: 'drawSpriteAt',
					blockType: Scratch.BlockType.COMMAND,
					text: 'draw [NAME] at X [X] Y [Y]',
					arguments: {
						NAME: {
							type: Scratch.ArgumentType.STRING,
							defaultValue: 'overlay1'
						},
						X: {
							type: Scratch.ArgumentType.NUMBER,
							defaultValue: 0
						},
						Y: {
							type: Scratch.ArgumentType.NUMBER,
							defaultValue: 0
						}
					}
				},
				{
					opcode: 'drawSpriteRotated',
					blockType: Scratch.BlockType.COMMAND,
					text: 'draw [NAME] at X [X] Y [Y] rotation [ROTATION] degrees',
					arguments: {
						NAME: {
							type: Scratch.ArgumentType.STRING,
							defaultValue: 'overlay1'
						},
						X: {
							type: Scratch.ArgumentType.NUMBER,
							defaultValue: 0
						},
						Y: {
							type: Scratch.ArgumentType.NUMBER,
							defaultValue: 0
						},
						ROTATION: {
							type: Scratch.ArgumentType.NUMBER,
							defaultValue: 0
						}
					}
				},
				{
					opcode: 'drawSpriteScaled',
					blockType: Scratch.BlockType.COMMAND,
					text: 'draw [NAME] at X [X] Y [Y] scale [SCALE]',
					arguments: {
						NAME: {
							type: Scratch.ArgumentType.STRING,
							defaultValue: 'overlay1'
						},
						X: {
							type: Scratch.ArgumentType.NUMBER,
							defaultValue: 0
						},
						Y: {
							type: Scratch.ArgumentType.NUMBER,
							defaultValue: 0
						},
						SCALE: {
							type: Scratch.ArgumentType.NUMBER,
							defaultValue: 1
						}
					}
				},
				{
					blockType: Scratch.BlockType.LABEL,
					text: 'Sprite Drawing',
				},
				{
					opcode: 'drawShape',
					blockType: Scratch.BlockType.COMMAND,
					text: 'draw [SHAPE] at X [X] Y [Y] size [SIZE] color [COLOR]',
					arguments: {
						SHAPE: {
							type: Scratch.ArgumentType.STRING,
							menu: 'shapes',
							defaultValue: 'circle'
						},
						X: {
							type: Scratch.ArgumentType.NUMBER,
							defaultValue: 0
						},
						Y: {
							type: Scratch.ArgumentType.NUMBER,
							defaultValue: 0
						},
						SIZE: {
							type: Scratch.ArgumentType.NUMBER,
							defaultValue: 50
						},
						COLOR: {
							type: Scratch.ArgumentType.COLOR,
							defaultValue: '#ff0000'
						}
					}
				},
				{
					opcode: 'drawText',
					blockType: Scratch.BlockType.COMMAND,
					text: 'draw text [TEXT] at X [X] Y [Y] size [SIZE] color [COLOR]',
					arguments: {
						TEXT: {
							type: Scratch.ArgumentType.STRING,
							defaultValue: 'Hello'
						},
						X: {
							type: Scratch.ArgumentType.NUMBER,
							defaultValue: 0
						},
						Y: {
							type: Scratch.ArgumentType.NUMBER,
							defaultValue: 0
						},
						SIZE: {
							type: Scratch.ArgumentType.NUMBER,
							defaultValue: 20
						},
						COLOR: {
							type: Scratch.ArgumentType.COLOR,
							defaultValue: '#000000'
						}
					}
				},
				{
					opcode: 'drawLine',
					blockType: Scratch.BlockType.COMMAND,
					text: 'draw line from X1 [X1] Y1 [Y1] to X2 [X2] Y2 [Y2] color [COLOR] width [WIDTH]',
					arguments: {
						X1: {
							type: Scratch.ArgumentType.NUMBER,
							defaultValue: 0
						},
						Y1: {
							type: Scratch.ArgumentType.NUMBER,
							defaultValue: 0
						},
						X2: {
							type: Scratch.ArgumentType.NUMBER,
							defaultValue: 100
						},
						Y2: {
							type: Scratch.ArgumentType.NUMBER,
							defaultValue: 100
						},
						COLOR: {
							type: Scratch.ArgumentType.COLOR,
							defaultValue: '#000000'
						},
						WIDTH: {
							type: Scratch.ArgumentType.NUMBER,
							defaultValue: 2
						}
					}
				},
				{
					blockType: Scratch.BlockType.LABEL,
					text: 'Advanced',
				},
				{
					opcode: 'fillRect',
					blockType: Scratch.BlockType.COMMAND,
					text: 'draw rectangle at X [X] Y [Y] width [W] height [H] color [COLOR]',
					arguments: {
						X: {
							type: Scratch.ArgumentType.NUMBER,
							defaultValue: 0
						},
						Y: {
							type: Scratch.ArgumentType.NUMBER,
							defaultValue: 0
						},
						W: {
							type: Scratch.ArgumentType.NUMBER,
							defaultValue: 100
						},
						H: {
							type: Scratch.ArgumentType.NUMBER,
							defaultValue: 100
						},
						COLOR: {
							type: Scratch.ArgumentType.COLOR,
							defaultValue: '#0000ff'
						}
					}
				},
				{
					opcode: 'fillCircle',
					blockType: Scratch.BlockType.COMMAND,
					text: 'draw circle at X [X] Y [Y] radius [R] color [COLOR]',
					arguments: {
						X: {
							type: Scratch.ArgumentType.NUMBER,
							defaultValue: 0
						},
						Y: {
							type: Scratch.ArgumentType.NUMBER,
							defaultValue: 0
						},
						R: {
							type: Scratch.ArgumentType.NUMBER,
							defaultValue: 50
						},
						COLOR: {
							type: Scratch.ArgumentType.COLOR,
							defaultValue: '#00ff00'
						}
					}
				},
				{
					opcode: 'setAlpha',
					blockType: Scratch.BlockType.COMMAND,
					text: 'set alpha (opacity) to [ALPHA]',
					arguments: {
						ALPHA: {
							type: Scratch.ArgumentType.NUMBER,
							defaultValue: 1
						}
					}
				},
				{
					opcode: 'render',
					blockType: Scratch.BlockType.COMMAND,
					text: 'render overlay',
				}
			]
		};
	}

	getMenus() {
		return {
			shapes: {
				acceptReporters: false,
				items: ['circle', 'square', 'triangle', 'star']
			}
		};
	}

	clearOverlay() {
		if (this.overlayCtx) {
			this.overlayCtx.clearRect(0, 0, this.overlayCanvas.width, this.overlayCanvas.height);
		}
	}

	showOverlay() {
		if (this.overlayCanvas) {
			this.overlayCanvas.style.display = 'block';
		}
	}

	hideOverlay() {
		if (this.overlayCanvas) {
			this.overlayCanvas.style.display = 'none';
		}
	}

	addSprite(SPRITENAME, NAME, util) {
		const target = this._findTarget(SPRITENAME, util);
		if (!target || !target.sprite) return;
		
		this.sprites[NAME] = {
			target: target,
			x: 0,
			y: 0,
			rotation: 0,
			scale: 1
		};
	}

	drawSpriteAt(NAME, X, Y) {
		if (!this.sprites[NAME]) return;
		
		const spriteData = this.sprites[NAME];
		spriteData.x = X;
		spriteData.y = Y;
		this._drawSpriteToOverlay(spriteData);
	}

	drawSpriteRotated(NAME, X, Y, ROTATION) {
		if (!this.sprites[NAME]) return;
		
		const spriteData = this.sprites[NAME];
		spriteData.x = X;
		spriteData.y = Y;
		spriteData.rotation = ROTATION;
		this._drawSpriteToOverlay(spriteData);
	}

	drawSpriteScaled(NAME, X, Y, SCALE) {
		if (!this.sprites[NAME]) return;
		
		const spriteData = this.sprites[NAME];
		spriteData.x = X;
		spriteData.y = Y;
		spriteData.scale = SCALE;
		this._drawSpriteToOverlay(spriteData);
	}

	_drawSpriteToOverlay(spriteData) {
		if (!this.overlayCtx || !spriteData.target) return;

		const costume = spriteData.target.sprite.currentCostume;
		if (!costume || !costume.asset) return;

		try {
			const asset = costume.asset;
			const url = asset.enclosedAsset ? asset.enclosedAsset.url : asset.url;
			
			const img = new Image();
			img.onload = () => {
				this.overlayCtx.save();
				this.overlayCtx.translate(spriteData.x, spriteData.y);
				this.overlayCtx.rotate((spriteData.rotation * Math.PI) / 180);
				this.overlayCtx.scale(spriteData.scale, spriteData.scale);
				this.overlayCtx.drawImage(img, -img.width / 2, -img.height / 2);
				this.overlayCtx.restore();
			};
			img.src = url;
		} catch (e) {
			console.error('Error drawing sprite:', e);
		}
	}

	drawShape(SHAPE, X, Y, SIZE, COLOR) {
		if (!this.overlayCtx) return;

		this.overlayCtx.fillStyle = COLOR;
		this.overlayCtx.beginPath();

		switch (SHAPE.toLowerCase()) {
			case 'circle':
				this.overlayCtx.arc(X, Y, SIZE / 2, 0, Math.PI * 2);
				break;
			case 'square':
				this.overlayCtx.rect(X - SIZE / 2, Y - SIZE / 2, SIZE, SIZE);
				break;
			case 'triangle':
				this.overlayCtx.moveTo(X, Y - SIZE / 2);
				this.overlayCtx.lineTo(X + SIZE / 2, Y + SIZE / 2);
				this.overlayCtx.lineTo(X - SIZE / 2, Y + SIZE / 2);
				this.overlayCtx.closePath();
				break;
			case 'star':
				this._drawStar(X, Y, 5, SIZE / 2, SIZE / 4);
				break;
		}

		this.overlayCtx.fill();
	}

	_drawStar(cx, cy, spikes, outerRadius, innerRadius) {
		let rot = Math.PI / 2 * 3;
		let step = Math.PI / spikes;

		this.overlayCtx.beginPath();
		this.overlayCtx.moveTo(cx, cy - outerRadius);
		for (let i = 0; i < spikes; i++) {
			this.overlayCtx.lineTo(cx + Math.cos(rot) * outerRadius, cy + Math.sin(rot) * outerRadius);
			rot += step;

			this.overlayCtx.lineTo(cx + Math.cos(rot) * innerRadius, cy + Math.sin(rot) * innerRadius);
			rot += step;
		}
		this.overlayCtx.lineTo(cx, cy - outerRadius);
		this.overlayCtx.closePath();
	}

	drawText(TEXT, X, Y, SIZE, COLOR) {
		if (!this.overlayCtx) return;

		this.overlayCtx.fillStyle = COLOR;
		this.overlayCtx.font = `${SIZE}px Arial`;
		this.overlayCtx.textAlign = 'center';
		this.overlayCtx.textBaseline = 'middle';
		this.overlayCtx.fillText(TEXT, X, Y);
	}

	drawLine(X1, Y1, X2, Y2, COLOR, WIDTH) {
		if (!this.overlayCtx) return;

		this.overlayCtx.strokeStyle = COLOR;
		this.overlayCtx.lineWidth = WIDTH;
		this.overlayCtx.beginPath();
		this.overlayCtx.moveTo(X1, Y1);
		this.overlayCtx.lineTo(X2, Y2);
		this.overlayCtx.stroke();
	}

	fillRect(X, Y, W, H, COLOR) {
		if (!this.overlayCtx) return;

		this.overlayCtx.fillStyle = COLOR;
		this.overlayCtx.fillRect(X, Y, W, H);
	}

	fillCircle(X, Y, R, COLOR) {
		if (!this.overlayCtx) return;

		this.overlayCtx.fillStyle = COLOR;
		this.overlayCtx.beginPath();
		this.overlayCtx.arc(X, Y, R, 0, Math.PI * 2);
		this.overlayCtx.fill();
	}

	setAlpha(ALPHA) {
		if (!this.overlayCtx) return;
		this.overlayCtx.globalAlpha = Math.max(0, Math.min(1, ALPHA));
	}

	render() {
		// Rendering happens automatically as we draw
		// This block exists for control flow purposes
	}

	_findTarget(name, util) {
		if (util && util.target) return util.target;
		let runtime = this.runtime;
		if (!runtime) {
			if (typeof Scratch !== 'undefined' && Scratch.vm && Scratch.vm.runtime)
				runtime = Scratch.vm.runtime;
			else if (typeof window !== 'undefined' && window.vm && window.vm.runtime)
				runtime = window.vm.runtime;
		}
		if (!runtime || !name) return null;

		for (const target of runtime.targets) {
			if (target.sprite && target.sprite.name === name) return target;
			if (target.getName && target.getName() === name) return target;
		}
		return null;
	}
}

Scratch.extensions.register(new SpriteOverlay());
