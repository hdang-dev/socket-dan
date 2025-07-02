/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
// import Peer, { MediaConnection } from "peerjs";
import Peer from "peerjs";
// import { socket } from "../../socket";
// import { io } from "socket.io-client";

// const socket = io(import.meta.env.VITE_SERVER_URL);

export function CallRoom() {
  const [myStream] = useState<MediaStream | undefined>();
  const peer = new Peer();
  // const peers: { [friendId: string]: MediaConnection; } = {};
  const videoGridRef = useRef<HTMLDivElement>(null);

  // const createVideoGrid = () => {
  //   console.log(123);
  // };

  useEffect(() => {
    // peer.on("open", (peerId) => socket.emit("join", peerId));
    // navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
    //   // myVideo.current!.srcObject = stream;
    //   // setMyStream(stream);
    //   peer.on("call", (call) => {
    //     console.log("Someone is calling u");
    //     call.answer(stream);
    //     // call.on("stream", (remoteStream) => {
    //     //   console.log("Calllllllllll");
    //     //   // friendVideo.current!.srcObject = remoteStream;
    //     // });
    //     call.on("close", () => {
    //       console.log("call close 222");
    //     });
    //   });
    //   // socket.on("new-user", (friendId: string) => {
    //   //   console.log("Calling new friend: ", friendId);
    //   //   const call = peer.call(friendId, stream);
    //   //   console.log("Calling new friend 2");
    //   //   call.on("stream", (remoteStream) => {
    //   //     console.log("Calling new friend 3");
    //   //     friendVideo.current!.srcObject = remoteStream;
    //   //   });
    //   //   call.on("close", () => {
    //   //     console.log("call close");
    //   //   });
    //   //   // peers[friendId] = call;
    //   // });
    // });
  }, []);

  useEffect(() => {
    if (videoGridRef.current) {
      console.log(videoGridRef.current.clientWidth);
      console.log(videoGridRef.current.clientHeight);
    }
  }, []);

  return (
    <div className="w-full h-full p-[20px] pt-[50px] flex flex-col gap-[20px]">
      <div ref={videoGridRef} className="w-full flex-1 grid place-items-center grid-cols-4 gap-[20px]">
        {/* {myStream && ( */}
        <>
          {/* 1 person */}
          {/* <Video stream={myStream} /> */}

          {/* 2 people */}
          <Video stream={myStream} />
          <Video stream={myStream} />
          <Video stream={myStream} />
          <Video stream={myStream} />
          <Video stream={myStream} />
          <Video stream={myStream} />
          <Video stream={myStream} />
          <Video stream={myStream} />
          <Video stream={myStream} />
          <Video stream={myStream} />
          <Video stream={myStream} />
          <Video stream={myStream} />
          {/* <Video stream={myStream} />
          <Video stream={myStream} /> */}
        </>
      </div>

      <div className="flex gap-[20px] justify-center">
        <button className="w-[50px] aspect-square rounded-full bg-sky-500">A</button>
        <button className="w-[50px] aspect-square rounded-full bg-sky-500">X</button>
      </div>
    </div>
  );
}

const Video = ({ stream, style }: { stream?: MediaStream; style?: string }) => {
  // const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    // ref.current!.srcObject = stream;
    console.log(stream);
  }, []);
  return <div className={`rounded-xl border-[3px] overflow-hidden bg-black w-full h-full ${style ?? ""}`}></div>;
  // return <video ref={ref} autoPlay className="rounded-xl border-[3px] object-cover w-full h-full max-h-[50%] md:max-h-none md:max-w-[50%] "></video>;
};
