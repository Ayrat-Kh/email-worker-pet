import { Job } from 'app/types';
import JobCard from 'components/JobCard';
import styles from './JobList.module.css';

export type JobListProps = {
    jobs: Job[];
};

const JobList: React.FC<JobListProps> = ({ jobs }) => {
    return (
        <div className={styles['job-list']}>
            {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
            ))}
        </div>
    );
};

export default JobList;
