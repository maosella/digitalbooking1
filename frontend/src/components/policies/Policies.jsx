import React from "react";
import { nanoid } from "nanoid";

const Policies = ({ policies, checkOut, cancellation }) => {
  return (
    <div className="container mx-auto">
      <div className="px-10 py-5 text-2xl font-bold border-2 border-white border-b-primary ">
        <h2>¿Qué tenes que saber?</h2>
      </div>
      <div className="md:grid md:grid-cols-2 lg:grid-cols-3 lg:w-4/5 px-10  gap-4 pb-20">
        <div>
          <h3 className="text-secondary text-xl pt-8 pb-5 font-semibold">
            Normas de la casa
          </h3>
          <ul className="text-tertiary">
            {policies.map((policy) => {
              if (policy.type === "Normas de la casa") {
                return (
                  <li className="my-2" key={nanoid()}>
                    {policy.name}
                  </li>
                );
              }
            })}
            <li className="my-2" key={nanoid()}>
              Check Out: {checkOut}
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-secondary text-xl pt-8 pb-5 font-semibold">
            Salud y seguridad
          </h3>
          <ul className="text-tertiary">
            {policies.map((policy) => {
              if (policy.type === "Salud y seguridad") {
                return (
                  <li className="my-2" key={nanoid()}>
                    {policy.name}
                  </li>
                );
              }
            })}
          </ul>
        </div>
        <div>
          <h3 className="text-secondary text-xl pt-8 pb-5 font-semibold">
            Política de cancelación
          </h3>
          <ul className="text-tertiary">
            <li className="my-2" key={nanoid()}>
              {cancellation}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Policies;
