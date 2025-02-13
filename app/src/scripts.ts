import { io } from "socket.io-client";

const localVideoEl = document.querySelector<HTMLVideoElement>('#local-video')
const remoteVideoEl = document.querySelector<HTMLVideoElement>('#remote-video')

let localStream: MediaStream | undefined; //  A variable to hold the local video stream
let remoteStream; //  A variable to hold the remote video stream
let peerConnection: RTCPeerConnection | undefined; //  The peerConnection that the two client use to talk

let peerConfiguration = {
  iceServers:[
    {
      urls:[
        'stun:stun.l.google.com:19302',
        'stun:stun1.l.google.com:19302'
      ]
    }
  ]
}

//  When a client initiates a call
const call = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true
  });
  if (localVideoEl) {
    localVideoEl.srcObject = stream
    localStream = stream
  }

  await createPeerConnection()

  try {
    console.log("Creating offer...")
    
    const offer = await peerConnection?.createOffer()
    peerConnection?.setLocalDescription(offer)

    console.log("🚀 ~ call ~ offer:", offer)
  } catch (error) {
    console.error("🚀 ~ call ~ error:", error)
    
  }
}

const createPeerConnection = async () => {
  return new Promise<void>(async (resolve, reject) => {

    //  RTCPeerConnection is the thing that creates the connection
    //  we can pass a config object, and that config object can contain stun servers
    //  which will fetch us ICE candidates
    peerConnection = await new RTCPeerConnection(peerConfiguration)

    localStream.getTracks().forEach(track => {
      peerConnection?.addTrack(track, localStream)
    })
    
    peerConnection.addEventListener('icecandidate', e => {
      console.log('......Ice candidate found !!!')
      console.log("🚀 ~ createPeerConnection ~ e:", e)
    })
    resolve()
  })
} 

document.querySelector('#call')?.addEventListener('click', call)

const socket = io('http://localhost:8181');

socket.on("connect", () => {
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});

socket.on("disconnect", () => {
  console.log(socket.id); // undefined
});
