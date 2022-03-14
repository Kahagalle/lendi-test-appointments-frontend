import { useState, useContext } from 'react';
import axios from "axios";
import styled from "styled-components";

import Broker from "./Broker";
import { AppointmentContext, AppointmentDetails } from "../Root";

const Wrapper = styled.div`
    display: flex;
`;

const SideBar = styled.div`
    width: 250px;
`;

const Heading = styled.strong.attrs({ role: "heading", level: 2 })`
    display: block;
    font-size: 20px;
`;

type BrokerAppointments = {
    id: number;
    name: string;
    appointments: { id: number; brokerId: number; date: string }[];
}[];

const AppointmentSelect = () => {

    const [brokerAppointments, setBrokerAppointments] = useState<BrokerAppointments>([]);

    Promise.all([
            axios.get("http://localhost:8080/brokers"),
            axios.get("http://localhost:8080/appointments")
        ])
        .then((res: any[]) => {
            let brokers: BrokerAppointments = res[0].data;
            let appointments = res[1].data;
            console.log(brokers);
            for (let broker of brokers) {
                broker.appointments = appointments.filter((appointment: any) => {
                    return appointment.brokerId == broker.id;
                });
            }
            setBrokerAppointments(brokers);
        });
    
    const appointmentDetails = useContext<AppointmentDetails>(AppointmentContext);

    const selectAppointment = (brokerName: string, appointmentDate: string) => {
        appointmentDetails.setAppointment({
            brokerName: brokerName,
            date: appointmentDate
        });
    }

return (
    <Wrapper>
        <SideBar>
            <Heading>Brokers</Heading>
            <ul>
                {brokerAppointments.map((broker) => (
                    <Broker key={broker.id} broker={broker} selectAppointment={selectAppointment}/>
                ))} 
            </ul>
        </SideBar>
        {appointmentDetails.appointment.brokerName && appointmentDetails.appointment.date &&
            <div>
                <Heading>Appointment details</Heading> <br />
                Broker Name : {appointmentDetails.appointment.brokerName} <br />
                Appointment Date : {appointmentDetails.appointment.date}
            </div>
        }
    </Wrapper>
    );
};

export default AppointmentSelect;
