import moment from 'moment';
import '../styles/DateTime.css';
import { Spacer } from '@nextui-org/react';

const DateTime = () => {


    return (
        <div className="dateTimeDisplay">
            <div className="date">
                {moment().format('Do')}
                <Spacer y={1} />
                {moment().format('MMMM')}
            </div>
            <p> todays date</p>
        </div>
    );
};

export default DateTime;
