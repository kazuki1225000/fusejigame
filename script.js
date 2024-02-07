let textLines = [];
let cursorPosition = 0;

function addText() {
  const inputText = document.getElementById('textInput').value;
  if (inputText.trim() !== '') {
    textLines.push(inputText);
    document.getElementById('textInput').value = ''; // Clear input box
    renderPreview();
  }
}

function addHiddenText() {
  const hiddenChar = '█';
  const inputField = document.getElementById('textInput');
  cursorPosition = inputField.selectionStart;
  const textBeforeCursor = inputField.value.substring(0, cursorPosition);
  const textAfterCursor = inputField.value.substring(cursorPosition);
  const newText = textBeforeCursor + hiddenChar + textAfterCursor;
  inputField.value = newText;
  inputField.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
  inputField.focus(); // Keep focus on input field after adding hidden text
}

function renderPreview() {
  const previewDiv = document.getElementById('preview');
  previewDiv.innerHTML = '';
  textLines.forEach(line => {
    const lineDiv = document.createElement('div');
    lineDiv.textContent = line;
    previewDiv.appendChild(lineDiv);
  });
}

function generateImage() {
    html2canvas(document.getElementById('preview'), {
      backgroundColor: '#ffffff', // Set background color to white
      onrendered: function(canvas) {
        // Convert canvas to image and save
        canvas.toBlob(blob => {
          saveAs(blob, 'preview.png');
        });
      }
    });
  }
  

function shareOnTwitter() {
  const textToShare = textLines.join('\n') + '\n#伏せ字クイズ'; // Add hashtag to the end of the tweet
  const imageUrl = 'URL_TO_YOUR_GENERATED_IMAGE'; // Replace with actual image URL
  const pageUrl = window.location.href; // Get current page URL
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(textToShare)}&url=${encodeURIComponent(pageUrl)}`;
  window.open(twitterUrl, '_blank');
}

