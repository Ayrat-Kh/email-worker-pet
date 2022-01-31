import { FormEvent, useState } from 'react';
import styles from './ScheduleJobForm.module.css';

export type ScheduleJobFormProps = {
    onSubmit: (count: number) => Promise<void> | void;
};

const ScheduleJobForm: React.FC<ScheduleJobFormProps> = ({ onSubmit }) => {
    const [value, setValue] = useState(1000);
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(value);
    };
    return (
        <form onSubmit={handleSubmit} className={styles['schedule-job-form']}>
            <label>
                Enter process count:
                <br />
                <input
                    type="number"
                    min={0}
                    step={1}
                    value={value}
                    onChange={(e) => setValue(+e.target.value)}
                />
            </label>
            <hr className={styles['schedule-job-form__push']} />
            <button className={styles['schedule-job-form__btn']} type="submit">
                Submit
            </button>
        </form>
    );
};

export default ScheduleJobForm;
