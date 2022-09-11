import React, { useState, useEffect } from "react";
import { helpHttp, backendUrl } from "../helpers/helpHttp";
import { Loader, Topbar } from "../utils";
import { Reservations } from "../components/reservations";
import { useAuth } from "../context";
import { FaHouseDamage } from "react-icons/fa";

const YourReservations = () => {
  let api = helpHttp();
  const { currentUser } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getReservations = async () => {
    const response = await api.get(
      `${backendUrl}/reservations/user/${currentUser?.id}`
    );
    setReservations(await response.json());
    setIsLoading(false);
  };

  useEffect(() => {
    if (currentUser) {
      getReservations();
    }
  }, [currentUser]);

  return (
    <div className="bg-neutral min-h-[85vh]">
      <Topbar title="Tus reservas" />
      {!isLoading && reservations.length === 0 && (
        <div className="flex-col-center mt-[30vh] gap-3">
          <FaHouseDamage className="text-primary block text-7xl" />
          <p className="text-primary font-bold text-xl">
            No tienes reservas por el momento!
          </p>
        </div>
      )}
      {isLoading ? <Loader /> : <Reservations reservations={reservations} />}
    </div>
  );
};

export default YourReservations;
