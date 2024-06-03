import moment from 'moment';
import '../styles/DateTime.css';
import { Spacer } from '@nextui-org/react';

const DateTime = () => {


    return (
        <div className="dateTimeDisplay">
            <div className="dateAlign">
                <div className="date">
                    {moment().format('Do')}
                    <Spacer y={1} />
                    {moment().format('MMMM')}
                </div>
                <p className="dateText"> todays date</p>
            </div>
        </div>
    );
};

export default DateTime;
