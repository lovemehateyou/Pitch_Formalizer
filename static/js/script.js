let mediaRecorder;
let audioChunks = [];
let isRecording = false;
let recordedBlob = null;

// Switch between text and audio tabs
function switchTab(tab) {
    const textTab = document.getElementById('text-tab');
    const audioTab = document.getElementById('audio-tab');
    const textButton = document.querySelector('[data-tab="text"]');
    const audioButton = document.querySelector('[data-tab="audio"]');

    if (tab === 'text') {
        textTab.classList.add('active');
        audioTab.classList.remove('active');
        textButton.classList.add('active');
        audioButton.classList.remove('active');
    } else {
        textTab.classList.remove('active');
        audioTab.classList.add('active');
        textButton.classList.remove('active');
        audioButton.classList.add('active');
    }
}

// Formalize pitch from text input
async function formalizePitch() {
    const pitchText = document.getElementById('pitch-text').value.trim();
    const language = document.getElementById('language').value;

    if (!pitchText) {
        showError('Please enter your pitch text');
        return;
    }

    showLoading();
    hideError();

    try {
        const response = await fetch('/formalize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                pitch_text: pitchText,
                language: language
            })
        });

        const data = await response.json();

        if (response.ok) {
            displayResults(data.original, data.formalized);
        } else {
            showError(data.error || 'An error occurred while processing your pitch');
        }
    } catch (error) {
        showError('Network error: ' + error.message);
    } finally {
        hideLoading();
    }
}

// Toggle audio recording
async function toggleRecording() {
    const recordBtn = document.getElementById('record-btn');
    const statusText = document.getElementById('recording-status');

    if (!isRecording) {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream);
            audioChunks = [];

            mediaRecorder.addEventListener('dataavailable', event => {
                audioChunks.push(event.data);
            });

            mediaRecorder.addEventListener('stop', () => {
                recordedBlob = new Blob(audioChunks, { type: 'audio/wav' });
                statusText.textContent = 'Recording complete! Click "Upload & Formalize" to process.';
                document.getElementById('upload-btn').disabled = false;
            });

            mediaRecorder.start();
            isRecording = true;
            recordBtn.textContent = '⏹️ Stop Recording';
            recordBtn.classList.add('recording');
            statusText.textContent = 'Recording in progress...';
        } catch (error) {
            showError('Could not access microphone: ' + error.message);
        }
    } else {
        mediaRecorder.stop();
        mediaRecorder.stream.getTracks().forEach(track => track.stop());
        isRecording = false;
        recordBtn.textContent = '🎤 Start Recording';
        recordBtn.classList.remove('recording');
    }
}

// Handle file selection
function handleFileSelect() {
    const fileInput = document.getElementById('audio-file');
    const uploadBtn = document.getElementById('upload-btn');

    if (fileInput.files.length > 0) {
        uploadBtn.disabled = false;
        recordedBlob = null; // Clear any recorded audio
    }
}

// Upload and process audio
async function uploadAudio() {
    const fileInput = document.getElementById('audio-file');
    const language = document.getElementById('language').value;
    let audioFile;

    // Check if we have a recorded audio or uploaded file
    if (recordedBlob) {
        audioFile = new File([recordedBlob], 'recording.wav', { type: 'audio/wav' });
    } else if (fileInput.files.length > 0) {
        audioFile = fileInput.files[0];
    } else {
        showError('Please record audio or select a file');
        return;
    }

    showLoading();
    hideError();

    const formData = new FormData();
    formData.append('audio', audioFile);
    formData.append('language', language);

    try {
        const response = await fetch('/formalize-audio', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            displayResults(data.original, data.formalized);
        } else {
            showError(data.error || 'An error occurred while processing your audio');
        }
    } catch (error) {
        showError('Network error: ' + error.message);
    } finally {
        hideLoading();
    }
}

// Display results
function displayResults(original, formalized) {
    document.getElementById('original-pitch').textContent = original;
    document.getElementById('formalized-pitch').textContent = formalized;
    document.getElementById('results').style.display = 'block';
    document.querySelector('.input-section').style.display = 'none';
}

// Show loading indicator
function showLoading() {
    document.getElementById('loading').style.display = 'block';
}

// Hide loading indicator
function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

// Show error message
function showError(message) {
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}

// Hide error message
function hideError() {
    document.getElementById('error').style.display = 'none';
}

// Reset the form
function reset() {
    document.getElementById('pitch-text').value = '';
    document.getElementById('audio-file').value = '';
    document.getElementById('results').style.display = 'none';
    document.querySelector('.input-section').style.display = 'block';
    document.getElementById('recording-status').textContent = '';
    document.getElementById('upload-btn').disabled = true;
    recordedBlob = null;
    audioChunks = [];
    hideError();
}
