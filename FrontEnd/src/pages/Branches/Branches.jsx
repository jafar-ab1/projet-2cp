import { useQuery } from '../../hooks/index';
import { branches } from '../../constants/index';

import NotFound from '../../pages/NotFound/NotFound';
import Branch from '../../components/Branch/Branch';

export default function Branches() {
  const query = useQuery();
  const city = query.get('city');
  const branch = branches.find((branch) => branch.city === city);

  if (!branch) return <NotFound />;

  return <Branch branch={branch} />;
}
