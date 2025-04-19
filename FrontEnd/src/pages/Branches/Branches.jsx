import { useLocation } from 'react-router-dom';

import { branches } from '../../constants/index';

import NotFound from '../../pages/NotFound/NotFound';
import Branch from '../../components/Branch/Branch';

function useQuery() {
  const location = useLocation();
  const { search } = location;
  return new URLSearchParams(search);
}

export default function Branches() {
  const query = useQuery();
  const city = query.get('city');
  const branch = branches.find((branch) => branch.city === city);

  if (!branch) return <NotFound />;

  return <Branch branch={branch} />;
}
