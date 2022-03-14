import React, { useState } from "react";
import styled from "styled-components";

export interface BrokerProps {
    broker: {
        name: string;
        id: number;
        appointments: { id: number; brokerId: number; date: string }[];
    },
    selectAppointment : any;
}

const Appointment = styled.li`
    cursor: pointer
`;

const Broker = (broker: BrokerProps) => {

    const [show, setShow] = useState(false);

    return (
        <li>
            {broker.broker.name}
            <br />
            appointments:
            <button onClick={() => setShow(show ? false : true)}>{show ? "Hide" : "Show"} appointments</button>
            {show &&
                <ul>
                    {broker.broker.appointments.map((appointment) => (
                        <Appointment onClick={() => broker.selectAppointment(broker.broker.name, appointment.date)}>
                            {appointment.date}
                        </Appointment>
                    ))} 
                </ul>
            }
        </li>
  );
};

export default Broker;
