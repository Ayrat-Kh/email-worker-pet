import { Job } from 'app/types';
import styles from './JobCard.module.css';

export type JobCardProps = {
    job: Job;
};

const JobCard: React.FC<JobCardProps> = ({ job }) => {
    return (
        <article className={styles['job-card']}>
            <Rowitem value={job.id} title="Job Id: " />
            <Rowitem value={job.notifyCount} title="Handling count: " />
            <Rowitem value={job.notifySuccessCount} title="Success: " />
            <Rowitem value={job.notifyFailedCount} title="Failed: " />
        </article>
    );
};

export default JobCard;

const Rowitem = ({
    title,
    value,
    isMain = false,
}: {
    title: string;
    value: any;
    isMain?: boolean;
}) => (
    <>
        <br />
        <h4
            className={`${styles['job-card__item-title']} ${
                isMain && styles['job-card__item-title--main']
            }`}
        >
            {title}{' '}
        </h4>
        <b
            className={`${styles['job-card__item-value']} ${
                isMain && styles['job-card__item-value--main']
            }`}
        >
            {value}
        </b>
    </>
);
