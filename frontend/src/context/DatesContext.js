import React, { createContext, useContext, useState } from "react";
import { format } from "date-fns";

export const DatesContext = createContext();

export const DatesProvider = (props) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const resetDates = () => {
        setStartDate(null);
        setEndDate(null)
    }

    const defaultDate = () => {
        return format(new Date(null, null, null), "yyyy-MM-dd")
    }

    const formatDate = (date) => {
        return format(date, "yyyy-MM-dd")
    };


    const value = {
        startDate,
        endDate,
        setStartDate,
        setEndDate,
        resetDates,
        formatDate,
        defaultDate
    }

    return (
        <DatesContext.Provider value={value}>
            {props.children}
        </DatesContext.Provider>
    );
};

export const useDates = () => useContext(DatesContext);


