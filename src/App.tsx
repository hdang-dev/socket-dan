import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Peer from "peerjs";
import "./App.css";

const socket = io("http://localhost:4000");

function App() {
  const myVideo = useRef<HTMLVideoElement>(null);
  const friendVideo = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState();
  const peer = new Peer();

  // console.log(123321, peer);

  const [id, setId] = useState<string>("");

  useEffect(() => {
    socket.on("user-id", (userId: string) => setId(userId));

    // peer.on("signal", () => {
    //   socket.emit("join", id);
    // });

    // peer.on("stream", (stream) => {
    //   friendVideo.current!.srcObject = stream;
    //   console.log(123321);
    // });

    socket.on("new-user", (newUser) => console.log("New user : ", newUser));

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        myVideo.current!.srcObject = stream;
      });
  }, []);

  return (
    <div className="flex">
      <video ref={myVideo} autoPlay></video>
      <video ref={friendVideo} autoPlay></video>
    </div>
  );
}

export default App;
