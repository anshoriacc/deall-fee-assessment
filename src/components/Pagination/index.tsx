import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './Pagination.module.scss';

const Pagination = (props) => {
  const { page, limit, count } = props.meta;
  const { search } = props;
  const location = useLocation();

  const numbers = Math.ceil(count / limit);

  return (
    <div className={styles.pagination}>
      <Link
        to={`${location.pathname}?${search ? `search=${search}&` : ''}${
          page ? `page=${page - 1}` : ''
        }`}
        className={page === 1 ? styles.disabled : null}
      >
        <button>{`<`}</button>
      </Link>

      {numbers > 2
        ? [...Array(numbers)].map((element, index) => {
            return (
              <Link
                to={`${location.pathname}?${search ? `search=${search}&` : ''}${
                  page ? `page=${index + 1}` : ''
                }`}
                className={page === index + 1 ? styles.disabled : null}
                key={index}
              >
                <button>{index + 1}</button>
              </Link>
            );
          })
        : null}
      <Link
        to={`${location.pathname}?${search ? `search=${search}&` : ''}${
          page ? `page=${page + 1}` : ''
        }`}
        className={page === Math.ceil(count / limit) ? styles.disabled : null}
      >
        <button>{`>`}</button>
      </Link>
    </div>
  );
};

export default Pagination;
