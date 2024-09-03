import { useState } from "react";
import { Dock } from "primereact/dock";
import { RadioButton } from "primereact/radiobutton";
import "./Demo.css";

export default function BasicDemo({all}) {
  const [position, setPosition] = useState("bottom");
//   alert(JSON.stringify(all))
  const items =  all.map((el)=>

    ({
      label: el.name,
      details: el.name,
      icon: () => (
        <img
          alt={el.name}
          src={el.image}
          width="100px"
          className="col-12 mx-4"
        />
      ),
    })


)
//   [
//     // {
//     //   label: "Finder",
//     //   icon: () => (
//     //     <img
//     //       alt="Finder"
//     //       src="https://primefaces.org/cdn/primereact/images/dock/finder.svg"
//     //       width="100%"
//     //       className="col-12"
//     //     />
//     //   ),
//     // },
//     // {
//     //   label: "App Store",
//     //   icon: () => (
//     //     <img
//     //       alt="App Store"
//     //       src="https://primefaces.org/cdn/primereact/images/dock/appstore.svg"
//     //       width="500px"
//     //       className="col-12"
//     //     />
//     //   ),
//     // },
//     // {
//     //   label: "Photos",
//     //   icon: () => (
//     //     <img
//     //       alt="Photos"
//     //       src="https://primefaces.org/cdn/primereact/images/dock/photos.svg"
//     //       width="100%"
//     //     />
//     //   ),
//     // },
//     // {
//     //   label: "Trash",
//     //   icon: () => (
//     //     <img
//     //       alt="trash"
//     //       src="https://primefaces.org/cdn/primereact/images/dock/trash.png"
//     //       width="100%"
//     //       height="100%"
//     //     />
//     //   ),
//     // },
//   ];

  const positions = [
    {
      label: "Bottom",
      value: "bottom",
    },
    {
      label: "Top",
      value: "top",
    },
    {
      label: "Left",
      value: "left",
    },
    {
      label: "Right",
      value: "right",
    },
  ];

  return (
    <div className="card dock-demo py-3 position-relative">
      {/* <div className="flex flex-wrap gap-3 mb-5">
        {positions.map((option) => {
          const { value, label } = option;

          return (
            <div className="flex align-items-center" key={label}>
              <RadioButton
                value={label}
                onChange={() => setPosition(option.value)}
                checked={position === value}
              />
              <label htmlFor={label} className="ml-2">
                {label}
              </label>
            </div>
          );
        })}
      </div> */}
      <div
        className="dock-window "
        style={{
          backgroundImage:
            "url(https://primefaces.org/cdn/primereact/images/dock/window.jpg)",
        }}
      >
        <Dock className="jbtw position-relative col-12 w-100" model={items} position={position} />
      </div>
    </div>
  );
}
