import React, { useContext } from "react";
import styled from "styled-components";

import { AppointmentContext, AppointmentDetails } from "../Root";

const Wrapper = styled.div`
    background-color: #e7e7e7;
    display: flex;
    font-size: 20px;
    justify-content: space-between;
    padding: 24px 48px;
    box-shadow: 1px 1px 1px #b8b8b8;
    margin-bottom: 48px;
`;

const Navigation = () => {
    const appointmentDetails = useContext<AppointmentDetails>(AppointmentContext);
    return (
        <Wrapper>
            {appointmentDetails.appointment.brokerName && appointmentDetails.appointment.date &&
                <strong>
                    Currently selected appointment: {appointmentDetails.appointment.date} with {appointmentDetails.appointment.brokerName}
                </strong>
            }
            {(!appointmentDetails.appointment.brokerName || !appointmentDetails.appointment.date) &&
                <strong></strong>
            }
            <strong>Welcome to Lendi</strong>
        </Wrapper>
    );
};

export default Navigation;
