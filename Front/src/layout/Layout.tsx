
import 'react-toastify/dist/ReactToastify.css'

import { useAuth } from '../Hooks/UserAuth';
import LytComponent from '../components/LytComponent';
import TstCmpnt from '../components/TstCmpnt';

export default function AppLayout() {
  ;


  const { data } = useAuth();

  return (
    <>
      <LytComponent nombres={data?.nombres} rol={data?.rol} />
      <TstCmpnt></TstCmpnt>
    </>
  )

}
