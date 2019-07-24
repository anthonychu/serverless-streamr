<template>
<div class="home">
  <h1>StreamR</h1>

  <div v-if="!watchingUser">
    Currently broadcasting:
    <ul>
      <li v-for="user in broadcastingUsers" :key="user.id">
        <a href="#" v-on:click.prevent="startWatching(user)">{{ user.name }} (@{{ user.id }})</a>
      </li>
    </ul>
  </div>
  <div v-else>
    <h2>{{ watchingUser.name }} (@{{ watchingUser.id }})</h2>
    <a href="#" v-on:click.prevent="stopWatching()">Stop watching</a>
  </div>
</div>
</template>

<script>
//import Vue from 'vue'
import { HubConnectionBuilder } from '@microsoft/signalr'
import { MessagePackHubProtocol } from '@microsoft/signalr-protocol-msgpack'

export default {
  name: 'home',
  data: () => {
    return {
      broadcastingUsers: [
        { id: 'nthonyChu', name: 'Anthony Chu' }
      ],
      watchingUser: null
    }
  },
  methods: {
    startWatching(user) {
      this.watchingUser = user
    },
    stopWatching() {
      this.watchingUser = null
    }
  },
  async mounted() {
    this.connection = new HubConnectionBuilder()
      .withUrl('http://localhost:7071/api')
      .withAutomaticReconnect()
      .withHubProtocol(new MessagePackHubProtocol())
      .build()
    
    await this.connection.start()
  },
  async beforeDestroy() {
    if (this.connection) {
      await this.connection.stop()
    }
  }
}
</script>


