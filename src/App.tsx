import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import Peer, { MediaConnection } from "peerjs";
import "./App.css";

const socket = io("https://chat-dan-server.onrender.com");


function App() {
  const myVideo = useRef<HTMLVideoElement>(null);
  const friendVideo = useRef<HTMLVideoElement>(null);
  const peer = new Peer();
  const peers: { [friendId: string]: MediaConnection; } = {};

  useEffect(() => {
    peer.on("open", peerId => socket.emit("join", peerId));

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        myVideo.current!.srcObject = stream;

        peer.on("call", call => {
          console.log("Someone is calling u");

          call.answer(stream);
          call.on("stream", remoteStream => {
            console.log("Calllllllllll");
            friendVideo.current!.srcObject = remoteStream;
          });

          call.on('close', () => {
            console.log("call close 222");

          });
        });

        socket.on("new-user", (friendId) => {
          console.log("Calling new friend: ", friendId);
          const call = peer.call(friendId, stream);

          console.log("Calling new friend 2");

          call.on("stream", remoteStream => {
            console.log("Calling new friend 3");
            friendVideo.current!.srcObject = remoteStream;
          });

          call.on('close', () => {
            console.log("call close");

          });
          peers[friendId] = call;
        });

      });
  }, []);

  return (
    <div className="flex flex-col">
      <video ref={myVideo} autoPlay></video>
      <video ref={friendVideo} autoPlay></video>
    </div>
  );
}

export default App;
