import { useQuery } from '@tanstack/react-query';
import { userAllUrls } from '../apis/userUrl.api';

export const useUsersUrls = () => {
  const query = useQuery({
    queryKey: ['user-allUrls'],
    queryFn: userAllUrls,
  });
  return query;
}
