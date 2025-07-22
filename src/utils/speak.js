function speak(text){
    if (!text) return
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';

        utterance.voice = window.speechSynthesis.getVoices()[0]

        window.speechSynthesis.speak(utterance);
      } else {
        alert('Ваш браузер не поддерживает Web Speech API');
      }
}

export default speak;