/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
// import Peer, { MediaConnection } from "peerjs";
import Peer from "peerjs";
// import { socketService as socket } from "../../socket";
// import { io } from "socket.io-client";

// const socket = io(import.meta.env.VITE_SERVER_URL);

export function CallRoom() {
  const [myStream, setMyStream] = useState<MediaStream | null>(null);
  const peer = new Peer();
  // const peers: { [friendId: string]: MediaConnection; } = {};

  useEffect(() => {
    // peer.on("open", (peerId) => socket.emit("join", peerId));

    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      // myVideo.current!.srcObject = stream;
      setMyStream(stream);

      peer.on("call", (call) => {
        console.log("Someone is calling u");

        call.answer(stream);
        // call.on("stream", (remoteStream) => {
        //   console.log("Calllllllllll");

        //   // friendVideo.current!.srcObject = remoteStream;
        // });

        call.on("close", () => {
          console.log("call close 222");
        });
      });

      // socket.on("new-user", (friendId: string) => {
      //   console.log("Calling new friend: ", friendId);
      //   const call = peer.call(friendId, stream);

      //   console.log("Calling new friend 2");

      //   call.on("stream", (remoteStream) => {
      //     console.log("Calling new friend 3");
      //     friendVideo.current!.srcObject = remoteStream;
      //   });

      //   call.on("close", () => {
      //     console.log("call close");
      //   });
      //   // peers[friendId] = call;
      // });
    });
  }, []);

  return (
    <div className="w-full h-full p-[10px] pb-[30px] flex flex-col gap-[30px]">
      {/* <video ref={myVideo} autoPlay></video> */}
      {/* <video ref={friendVideo} autoPlay></video> */}
      {/* <div className="w-full h-full flex flex-wrap gap-[20px] justify-center items-center relative"> */}
      <div className="w-full flex-1 grid grid-cols-2 gap-[10px] place-items-center">
        {myStream && (<>
          < Video stream={myStream} />
          <Video stream={myStream} />
          <Video stream={myStream} />
          <Video stream={myStream} />
          <Video stream={myStream} />
          <Video stream={myStream} />
        </>
        )}
      </div>

      <div className="flex gap-[20px] justify-center">
        <button className="w-[50px] aspect-square rounded-full bg-sky-500">A</button>
        <button className="w-[50px] aspect-square rounded-full bg-sky-500">X</button>
      </div>
    </div>
  );
}

const Video = ({ stream }: { stream: MediaStream; }) => {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    ref.current!.srcObject = stream;
  }, []);
  return (
    <video ref={ref} className="rounded-xl object-cover w-full h-full" src="" autoPlay></video>
  );
};;;