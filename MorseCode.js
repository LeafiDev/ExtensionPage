class MorseCode {
  getInfo() {
    return {
      id: 'morsecode',
      name: 'Morse Code',
      color1: '#808080',
      color2: '#666666',
      color3: '#4d4d4d',
      menuIconURI: 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI2MC4xODA3NiIgaGVpZ2h0PSI2MC4xODA3NiIgdmlld0JveD0iMCwwLDYwLjE4MDc2LDYwLjE4MDc2Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjA5LjkwOTYzLC0xNDkuOTA5NjMpIj48ZyBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiPjxwYXRoIGQ9Ik0yMDkuOTA5NjQsMTgwLjAwMDAyYzAsLTE2LjYxODQ2IDEzLjQ3MTkyLC0zMC4wOTAzOCAzMC4wOTAzOCwtMzAuMDkwMzhjMTYuNjE4NDYsMCAzMC4wOTAzOCwxMy40NzE5MiAzMC4wOTAzOCwzMC4wOTAzOGMwLDE2LjYxODQ2IC0xMy40NzE5MiwzMC4wOTAzOCAtMzAuMDkwMzgsMzAuMDkwMzhjLTE2LjYxODQ2LDAgLTMwLjA5MDM4LC0xMy40NzE5MiAtMzAuMDkwMzgsLTMwLjA5MDM4eiIgZmlsbD0iIzgwODA4MCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiLz48cGF0aCBkPSJNMjE3LjYwNDMzLDE4MC4wMDAwMmMwLC0yLjY5MjggMi4xODI5NSwtNC44NzU3NSA0Ljg3NTc1LC00Ljg3NTc1YzIuNjkyOCwwIDQuODc1NzUsMi4xODI5NSA0Ljg3NTc1LDQuODc1NzVjMCwyLjY5MjggLTIuMTgyOTUsNC44NzU3NSAtNC44NzU3NSw0Ljg3NTc1Yy0yLjY5MjgsMCAtNC44NzU3NSwtMi4xODI5NSAtNC44NzU3NSwtNC44NzU3NXoiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIwIi8+PHBhdGggZD0iTTI1Mi42NDQyMSwxODAuMDAwMDJjMCwtMi42OTI4IDIuMTgyOTUsLTQuODc1NzUgNC44NzU3NSwtNC44NzU3NWMyLjY5MjgsMCA0Ljg3NTc1LDIuMTgyOTUgNC44NzU3NSw0Ljg3NTc1YzAsMi42OTI4IC0yLjE4Mjk1LDQuODc1NzUgLTQuODc1NzUsNC44NzU3NWMtMi42OTI4LDAgLTQuODc1NzUsLTIuMTgyOTUgLTQuODc1NzUsLTQuODc1NzV6IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMCIvPjxwYXRoIGQ9Ik0yMzEuOTAxMjksMTgwaDE1LjcwMTU3IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iNSIvPjwvZz48L2c+PC9zdmc+',
      blockIconURI: 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI0NC43OTEzOCIgaGVpZ2h0PSI5Ljc1MTUiIHZpZXdCb3g9IjAsMCw0NC43OTEzOCw5Ljc1MTUiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMTcuNjA0MzQsLTE3NS4xMjQyNykiPjxnIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIj48cGF0aCBkPSJNMjE3LjYwNDM0LDE4MC4wMDAwM2MwLC0yLjY5MjggMi4xODI5NSwtNC44NzU3NSA0Ljg3NTc1LC00Ljg3NTc1YzIuNjkyOCwwIDQuODc1NzUsMi4xODI5NSA0Ljg3NTc1LDQuODc1NzVjMCwyLjY5MjggLTIuMTgyOTUsNC44NzU3NSAtNC44NzU3NSw0Ljg3NTc1Yy0yLjY5MjgsMCAtNC44NzU3NSwtMi4xODI5NSAtNC44NzU3NSwtNC44NzU3NXoiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMCIvPjxwYXRoIGQ9Ik0yNTIuNjQ0MjIsMTgwLjAwMDAzYzAsLTIuNjkyOCAyLjE4Mjk1LC00Ljg3NTc1IDQuODc1NzUsLTQuODc1NzVjMi42OTI4LDAgNC44NzU3NSwyLjE4Mjk1IDQuODc1NzUsNC44NzU3NWMwLDIuNjkyOCAtMi4xODI5NSw0Ljg3NTc1IC00Ljg3NTc1LDQuODc1NzVjLTIuNjkyOCwwIC00Ljg3NTc1LC0yLjE4Mjk1IC00Ljg3NTc1LC00Ljg3NTc1eiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIwIi8+PHBhdGggZD0iTTIzMS45MDEzLDE4MC4wMDAwMWgxNS43MDE1NyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSI1Ii8+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6MjIuMzk1NjY0OTk5OTk5OTg6NC44NzU3MjQ5OTk5OTk5ODg1LS0+',
      blocks: [
        {
          opcode: 'textToMorse',
          blockType: Scratch.BlockType.REPORTER,
          text: 'convert [TEXT] to morse code',
          arguments: {
            TEXT: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'HELLO'
            }
          }
        },
        {
          opcode: 'morseToText',
          blockType: Scratch.BlockType.REPORTER,
          text: 'convert morse [MORSE] to text',
          arguments: {
            MORSE: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: '.... . .-.. .-.. ---'
            }
          }
        }
      ]
    };
  }

  textToMorse(args) {
    const morseDict = {
      'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
      'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
      'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
      'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
      'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
      '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
      '8': '---..', '9': '----.', ' ': '/'
    };

    const text = String(args.TEXT).toUpperCase();
    return text.split('').map(char => morseDict[char] || char).join(' ');
  }

  morseToText(args) {
    const textDict = {
      '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E', '..-.': 'F',
      '--.': 'G', '....': 'H', '..': 'I', '.---': 'J', '-.-': 'K', '.-..': 'L',
      '--': 'M', '-.': 'N', '---': 'O', '.--.': 'P', '--.-': 'Q', '.-.': 'R',
      '...': 'S', '-': 'T', '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X',
      '-.--': 'Y', '--..': 'Z', '-----': '0', '.----': '1', '..---': '2',
      '...--': '3', '....-': '4', '.....': '5', '-....': '6', '--...': '7',
      '---..': '8', '----.': '9', '/': ' '
    };

    const morse = String(args.MORSE);
    return morse.split(' ').map(code => textDict[code] || code).join('');
  }
}

Scratch.extensions.register(new MorseCode());