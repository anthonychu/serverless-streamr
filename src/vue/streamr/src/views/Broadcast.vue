<template>
  <div class="broadcast">
    <h1>Broadcast</h1>
    <button @click="toggleBroadcast">{{ isBroadcasting ? 'Stop' : 'Start' }}</button>

    <canvas style="border-color: black; border-width: 2px;" id="myCanvas"></canvas>
    
    <div>
      <pre>{{ asciiFrame }}</pre>
    </div>
  </div>
</template>

<script>
import camera from '../lib/camera'
import ascii from '../lib/ascii'

export default {
  name: 'broadcast',
  data() {
    return {
      isBroadcasting: false,
      asciiFrame: 'foo'
    }
  },
  methods: {
    toggleBroadcast() {
      if (this.isBroadcasting) {
        stopBroadcast()
        this.isBroadcasting = false
        return
      }
      
      const vm = this
      startBroadcast()
      this.isBroadcasting = true

      function startBroadcast() {
        const canvas = document.getElementById("myCanvas")
        camera.init({
          width: 100,
          height: 75,
          fps: 10,
          mirror: true,
          targetCanvas: canvas,
  
          onFrame: function (canvas) {
            ascii.fromCanvas(canvas, {
              contrast: 170,
              callback: function (asciiString) {
                vm.asciiFrame = asciiString
                console.log(asciiString)
                // // sender
                // if (useCompression) {
                //   const zip = new JSZip()
                //   zip.file('1', asciiString)
                //   zip.generateAsync(zipOptions).then(function (payload) {
                //     axios.post(apiBaseUrl + '/api/sendframe', payload)
                //   })
                // } else {
                //   axios.post(apiBaseUrl + '/api/sendframe', asciiString)
                // }
              }
            })
          },
  
          onSuccess: function () {
            // isStreaming = true
          },
  
          onError: function (error) {
            console.log(error)
          }
        })
      }

      function stopBroadcast() {
        camera.stop()
      }
    }
  }
}
</script>
