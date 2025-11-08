(function(Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('This extension must run unsandboxed');
  }

  class ToolbarButtons {
    constructor() {
      this.buttonEvents = {};
      this.buttonCounter = 0;
    }

    getInfo() {
      return {
        id: 'toolbarbuttons',
        name: 'Toolbar Buttons',
        color1: '#7d83ff',
        color2: '#afb3ff',
        menuIconURI: 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI2MC4xODA3NiIgaGVpZ2h0PSI2MC4xODA3NiIgdmlld0JveD0iMCwwLDYwLjE4MDc2LDYwLjE4MDc2Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjA5LjkwOTYyLC0xNDkuOTA5NjIpIj48ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIj48cGF0aCBkPSJNMjA5LjkwOTYyLDE4MGMwLC0xNi42MTg0NiAxMy40NzE5MiwtMzAuMDkwMzggMzAuMDkwMzgsLTMwLjA5MDM4YzE2LjYxODQ2LDAgMzAuMDkwMzgsMTMuNDcxOTIgMzAuMDkwMzgsMzAuMDkwMzhjMCwxNi42MTg0NiAtMTMuNDcxOTIsMzAuMDkwMzggLTMwLjA5MDM4LDMwLjA5MDM4Yy0xNi42MTg0NiwwIC0zMC4wOTAzOCwtMTMuNDcxOTIgLTMwLjA5MDM4LC0zMC4wOTAzOHoiIGZpbGw9IiM3ZDgzZmYiLz48ZyBmaWxsPSIjZmZmZmZmIj48cGF0aCBkPSJNMjI0LjIzOTcyLDE2Mi44NzUyMmwzMS41MjA1NywxMy40NzQ4OWwtMjMuMzg4MTQsMTkuODI2NXoiLz48cGF0aCBkPSJNMjQ1Ljg4NzQxLDE5Ny4xMjQ3OGwtOC4yOTc1MSwtOC4yOTc1MWw4LjI5NzUxLC04LjI5NzUxbDguMjk3NTEsOC4yOTc1MXoiLz48L2c+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6MzAuMDkwMzgwMDAwMDAwMDE6MzAuMDkwMzgwMDAwMDAwMDEtLT4=',
        blockIconURI: 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIzMS41MjA1NyIgaGVpZ2h0PSIzNC4yNDk1NiIgdmlld0JveD0iMCwwLDMxLjUyMDU3LDM0LjI0OTU2Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjI0LjIzOTcyLC0xNjIuODc1MjIpIj48ZyBmaWxsPSIjZmZmZmZmIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIj48Zz48cGF0aCBkPSJNMjI0LjIzOTcyLDE2Mi44NzUyMmwzMS41MjA1NywxMy40NzQ4OWwtMjMuMzg4MTQsMTkuODI2NXoiLz48cGF0aCBkPSJNMjQ1Ljg4NzQxLDE5Ny4xMjQ3OGwtOC4yOTc1MSwtOC4yOTc1MWw4LjI5NzUxLC04LjI5NzUxbDguMjk3NTEsOC4yOTc1MXoiLz48L2c+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6MTUuNzYwMjc5OTk5OTk5OTk1OjE3LjEyNDc3OTk5OTk5OTk4Ny0tPg==',
        blocks: [
          {
            opcode: 'addButton',
            blockType: Scratch.BlockType.COMMAND,
            text: 'add button [ID] with icon [ICON] tooltip [TOOLTIP]',
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'new-button'
              },
              ICON: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'dataurl'
              },
              TOOLTIP: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Button'
              }
            }
          },
          {
            opcode: 'removeButton',
            blockType: Scratch.BlockType.COMMAND,
            text: 'remove button [ID]',
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'new-button'
              }
            }
          },
          {
            opcode: 'removeAllButtons',
            blockType: Scratch.BlockType.COMMAND,
            text: 'remove all custom buttons'
          },
          '---',
          {
            opcode: 'whenButtonClicked',
            blockType: Scratch.BlockType.HAT,
            text: 'when button [ID] clicked',
            isEdgeActivated: false,
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'new-button'
              }
            }
          }
        ]
      };
    }

    addButton(args) {
      const vm = Scratch.vm;
      const buttonId = String(args.ID);
      const iconUrl = String(args.ICON);
      const tooltip = String(args.TOOLTIP);

      const button = document.createElement('div');
      button.id = buttonId;
      button.className = 'custom-toolbar-button';
      button.title = tooltip;
      button.style.cssText = `
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        margin: 0 0.25rem;
        padding: 0.375rem;
        border-radius: 0.25rem;
        cursor: pointer;
        user-select: none;
        transition: background-color 0.2s;
      `;

      const img = document.createElement('img');
      img.src = iconUrl;
      img.alt = tooltip;
      img.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: contain;
        pointer-events: none;
      `;

      button.appendChild(img);

      button.addEventListener('mouseenter', () => {
        button.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
      });
      button.addEventListener('mouseleave', () => {
        button.style.backgroundColor = 'transparent';
      });

      button.addEventListener('click', () => {
        this.buttonEvents[buttonId] = true;
        vm.runtime.startHats('toolbarbuttons_whenButtonClicked');
        setTimeout(() => {
          this.buttonEvents[buttonId] = false;
        }, 100);
      });

      const controlsContainer = document.querySelector('[class*="controls_controls-container"]') ||
                               document.querySelector('.controls_controls-container') ||
                               document.querySelector('[class*="stage-header_stage-button-row"]');

      if (controlsContainer) {
        controlsContainer.appendChild(button);
      } else {
        console.warn('Could not find toolbar container');
      }
    }

    removeButton(args) {
      const buttonId = String(args.ID);
      const button = document.getElementById(buttonId);
      
      if (button) {
        button.remove();
        delete this.buttonEvents[buttonId];
        return true;
      }
      
      return false;
    }

    removeAllButtons() {
      const buttons = document.querySelectorAll('.custom-toolbar-button');
      buttons.forEach(button => button.remove());
      this.buttonEvents = {};
      return true;
    }

    whenButtonClicked(args) {
      const buttonId = String(args.ID);
      return this.buttonEvents[buttonId] === true;
    }
  }

  Scratch.extensions.register(new ToolbarButtons());
})(Scratch);
