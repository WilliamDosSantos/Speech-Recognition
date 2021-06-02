class srApi {

  constructor(content) {
    
    const SpeechToText = window.SpeechRecognition ||
                         window.webkitSpeechRecognition;

    this.speechApi = new SpeechToText();
    this.output = content.output ? content.output : document.createElement('div');
    this.speechApi.continuous = true;
    this.speechApi.interimResult = false;
    this.speechApi.lang = "pt-BR";
    this.speechApi.onresult = (e) => {
      var resultIndex = e.resultIndex;
      var transcript = e.results[resultIndex][0].transcript;
      document.querySelector(".output").value += ' ' + transcript

    }
  }

  init() {
    this.speechApi.start();
  }

  stop() {
    this.speechApi.stop();
  }
}

window.onload = function() {
  var speech = new srApi({
    output: document.querySelector(".output")
  });

  document.querySelector(".btn-start").addEventListener("click", () => {
    document.querySelector(".btn-start").disabled = true
    document.querySelector(".btn-end").disabled = false
    speech.init();
  })
  
  document.querySelector(".btn-end").addEventListener("click", () => {
    document.querySelector(".btn-start").disabled = false
    document.querySelector(".btn-end").disabled = true
    speech.stop();
  })

  document.querySelector(".download").addEventListener('click', () => {
    var text = document.querySelector(".output").value
    var filename = "output.txt"

    download(text, filename)
  })

  function download(text, filename) {
    var element = document.createElement('a');

    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))

    element.setAttribute('download', filename)

    element.style.display = 'none'

    document.body.appendChild(element)

    element.click()

    document.body.removeChild(element)
  }

  document.querySelector(".clean").addEventListener("click", () => {
    document.querySelector(".output").value = ""
    document.querySelector(".btn-start").disabled = false
    document.querySelector(".btn-end").disabled = true
    speech.stop();
  })
}