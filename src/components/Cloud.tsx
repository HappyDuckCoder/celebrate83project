// import React from "react";
// import DialogCloud from "./DialogCloud";

// const Cloud = ({
//   text,
//   onClickFunction,
//   imglink,
//   isCreateRoom,
// }: {
//   text: string;
//   onClickFunction: () => void;
//   imglink: string;
//   isCreateRoom: boolean;
// }) => {
//   return (
//     <>
//       {isCreateRoom ? (
//         <div
//           className="flex items-center justify-center w-64 h-20 bg-no-repeat bg-contain relative transition-all duration-300 hover:brightness-75 hover:animate-[wiggle_0.5s_ease-in-out_infinite]  overflow-hidden"
//           style={{ backgroundImage: `url('${imglink}')` }}
//         >
//           <DialogCloud text={text} />
//         </div>
//       ) : (
//         <div
//           className="flex items-center justify-center w-64 h-20 bg-no-repeat bg-contain relative transition-all duration-300 hover:brightness-75 hover:animate-[wiggle_0.5s_ease-in-out_infinite]  overflow-hidden"
//           style={{ backgroundImage: `url('${imglink}')` }}
//           onClick={onClickFunction}
//         >
//           <p className="relative text-lg font-semibold text-gray-700 hover:text-white transition-all duration-300 cursor-pointer">
//             {text}
//           </p>
//         </div>
//       )}
//     </>
//   );
// };

// export default Cloud;
