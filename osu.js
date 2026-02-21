class OsuMap {
  getInfo() {
    return {
      id: 'osuMap',
      name: 'osu! Chart Data',
      color1: '#ff69b4',
      color2: '#ff1493',
      color3: '#c71585',

      blocks: [
        {
          opcode: 'parseOsuText',
          blockType: Scratch.BlockType.REPORTER,
          text: 'parse osu file [TEXT]',
          arguments: {
            TEXT: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: ''
            }
          }
        },
        {
          opcode: 'loadChart',
          blockType: Scratch.BlockType.COMMAND,
          text: 'load chart [JSON]',
          arguments: {
            JSON: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: '{}'
            }
          }
        },
        '---',
        {
          opcode: 'metadataLabel',
          blockType: Scratch.BlockType.LABEL,
          text: 'Metadata'
        },
        {
          opcode: 'getTitle',
          blockType: Scratch.BlockType.REPORTER,
          text: 'title'
        },
        {
          opcode: 'getArtist',
          blockType: Scratch.BlockType.REPORTER,
          text: 'artist'
        },
        {
          opcode: 'getCreator',
          blockType: Scratch.BlockType.REPORTER,
          text: 'creator'
        },
        {
          opcode: 'getDifficultyName',
          blockType: Scratch.BlockType.REPORTER,
          text: 'difficulty name'
        },
        '---',
        {
          opcode: 'difficultyLabel',
          blockType: Scratch.BlockType.LABEL,
          text: 'Difficulty'
        },
        {
          opcode: 'getCS',
          blockType: Scratch.BlockType.REPORTER,
          text: 'CS'
        },
        {
          opcode: 'getAR',
          blockType: Scratch.BlockType.REPORTER,
          text: 'AR'
        },
        {
          opcode: 'getOD',
          blockType: Scratch.BlockType.REPORTER,
          text: 'OD'
        },
        {
          opcode: 'getHP',
          blockType: Scratch.BlockType.REPORTER,
          text: 'HP'
        },
        '---',
        {
          opcode: 'timingLabel',
          blockType: Scratch.BlockType.LABEL,
          text: 'Timing'
        },
        {
          opcode: 'getBPM',
          blockType: Scratch.BlockType.REPORTER,
          text: 'BPM'
        },
        '---',
        {
          opcode: 'hitObjectLabel',
          blockType: Scratch.BlockType.LABEL,
          text: 'Mapping Data'
        },
        {
          opcode: 'getTotalHitObjects',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Total hit objects'
        },
        {
          opcode: 'getCircleCount',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Total circles'
        },
        {
          opcode: 'getSliderCount',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Total sliders'
        },
        {
          opcode: 'getSpinnerCount',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Total spinners'
        },
        '---',
        {
          opcode: 'hitObjectDataLabel',
          blockType: Scratch.BlockType.LABEL,
          text: 'Hit Object Data'
        },
        {
          opcode: 'getHitObjectX',
          blockType: Scratch.BlockType.REPORTER,
          text: 'hit object [INDEX] X',
          arguments: {
            INDEX: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 1
            }
          }
        },
        {
          opcode: 'getHitObjectY',
          blockType: Scratch.BlockType.REPORTER,
          text: 'hit object [INDEX] Y',
          arguments: {
            INDEX: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 1
            }
          }
        },
        {
          opcode: 'getHitObjectTime',
          blockType: Scratch.BlockType.REPORTER,
          text: 'hit object [INDEX] time',
          arguments: {
            INDEX: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 1
            }
          }
        },
        {
          opcode: 'getHitObjectType',
          blockType: Scratch.BlockType.REPORTER,
          text: 'hit object [INDEX] type',
          arguments: {
            INDEX: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 1
            }
          }
        },
        '---',
        {
          opcode: 'conversionLabel',
          blockType: Scratch.BlockType.LABEL,
          text: 'Conversion Blocks'
        },
        {
          opcode: 'msToSeconds',
          blockType: Scratch.BlockType.REPORTER,
          text: '[MS] ms to seconds',
          arguments: {
            MS: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 1000
            }
          }
        },
        {
          opcode: 'secondsToMs',
          blockType: Scratch.BlockType.REPORTER,
          text: '[SECONDS] seconds to ms',
          arguments: {
            SECONDS: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 1
            }
          }
        }
      ]
    };
  }

  constructor() {
    this.mapData = {
      metadata: {},
      difficulty: {},
      timingPoints: [],
      hitObjects: []
    };
  }

  parseOsuText(args) {
    const text = args.TEXT;
    if (!text) return '';

    const mapData = {
      metadata: {},
      difficulty: {},
      timingPoints: [],
      hitObjects: []
    };

    const lines = text.split('\n');
    let currentSection = '';

    for (let line of lines) {
      line = line.trim();
      
      if (!line || line.startsWith('//')) continue;

      if (line.startsWith('[') && line.endsWith(']')) {
        currentSection = line.slice(1, -1).toLowerCase();
        continue;
      }

      if (currentSection === 'hitobjects') {
        this.parseHitObject(line, mapData);
      } else if (currentSection === 'timingpoints') {
        this.parseTimingPoint(line, mapData);
      } else if (currentSection === 'metadata' || currentSection === 'difficulty') {
        const colonIndex = line.indexOf(':');
        if (colonIndex !== -1) {
          const key = line.substring(0, colonIndex).trim();
          const value = line.substring(colonIndex + 1).trim();
          
          if (currentSection === 'metadata') {
            mapData.metadata[key] = value;
          } else {
            mapData.difficulty[key] = parseFloat(value) || value;
          }
        }
      }
    }
    
    return JSON.stringify(mapData);
  }

  loadChart(args) {
    try {
      const json = args.JSON;
      this.mapData = JSON.parse(json);
    } catch (e) {
      console.error('Failed to load chart:', e);
    }
  }

  parseHitObject(line, mapData) {
    mapData = mapData || this.mapData;
    const parts = line.split(',');
    if (parts.length < 4) return;

    const hitObject = {
      x: parseInt(parts[0]),
      y: parseInt(parts[1]),
      time: parseInt(parts[2]),
      type: this.decodeHitObjectType(parseInt(parts[3]))
    };

    // Extract slider end position if this is a slider
    if (parts[5] && hitObject.type === 'Slider') {
      const curveData = parts[5];
      const points = curveData.split('|');
      if (points.length > 1) {
        const lastPoint = points[points.length - 1];
        const coords = lastPoint.split(':');
        if (coords.length === 2) {
          hitObject.endX = parseInt(coords[0]);
          hitObject.endY = parseInt(coords[1]);
        }
      }
    }

    mapData.hitObjects.push(hitObject);
  }

  decodeHitObjectType(typeInt) {
    if (typeInt & 1) return 'Circle';
    if (typeInt & 2) return 'Slider';
    if (typeInt & 8) return 'Spinner';
    return 'Unknown';
  }

  parseTimingPoint(line, mapData) {
    mapData = mapData || this.mapData;
    const parts = line.split(',');
    if (parts.length < 2) return;

    const timingPoint = {
      time: parseInt(parts[0]),
      beatLength: parseFloat(parts[1]),
      meter: parseInt(parts[2]) || 4,
      uninherited: parts[6] === '1'
    };

    mapData.timingPoints.push(timingPoint);
  }

  // Metadata getters
  getTitle() {
    return this.mapData.metadata.Title || '';
  }

  getArtist() {
    return this.mapData.metadata.Artist || '';
  }

  getCreator() {
    return this.mapData.metadata.Creator || '';
  }

  getDifficultyName() {
    return this.mapData.metadata.Version || '';
  }

  // Difficulty getters
  getCS() {
    return this.mapData.difficulty.CircleSize || 0;
  }

  getAR() {
    return this.mapData.difficulty.ApproachRate || 0;
  }

  getOD() {
    return this.mapData.difficulty.OverallDifficulty || 0;
  }

  getHP() {
    return this.mapData.difficulty.HPDrainRate || 0;
  }

  // Timing getter
  getBPM() {
    if (this.mapData.timingPoints.length === 0) return 0;
    const firstTiming = this.mapData.timingPoints[0];
    return Math.round(60000 / firstTiming.beatLength);
  }

  getTotalHitObjects() {
    return this.mapData.hitObjects.length;
  }

  getCircleCount() {
    return this.mapData.hitObjects.filter(obj => obj.type === 'Circle').length;
  }

  getSliderCount() {
    return this.mapData.hitObjects.filter(obj => obj.type === 'Slider').length;
  }

  getSpinnerCount() {
    return this.mapData.hitObjects.filter(obj => obj.type === 'Spinner').length;
  }

  getHitObjectX(args) {
    const index = parseInt(args.INDEX) - 1;
    if (index >= 0 && index < this.mapData.hitObjects.length) {
      return this.mapData.hitObjects[index].x;
    }
    return 0;
  }

  getHitObjectY(args) {
    const index = parseInt(args.INDEX) - 1;
    if (index >= 0 && index < this.mapData.hitObjects.length) {
      return this.mapData.hitObjects[index].y;
    }
    return 0;
  }

  getHitObjectTime(args) {
    const index = parseInt(args.INDEX) - 1;
    if (index >= 0 && index < this.mapData.hitObjects.length) {
      return this.mapData.hitObjects[index].time;
    }
    return 0;
  }

  getHitObjectType(args) {
    const index = parseInt(args.INDEX) - 1;
    if (index >= 0 && index < this.mapData.hitObjects.length) {
      return this.mapData.hitObjects[index].type;
    }
    return 'Unknown';
  }

  // Conversion functions
  msToSeconds(args) {
    return parseInt(args.MS) / 1000;
  }

  secondsToMs(args) {
    return parseInt(args.SECONDS) * 1000;
  }
}

Scratch.extensions.register(new OsuMap());
