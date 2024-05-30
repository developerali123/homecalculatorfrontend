import axios from 'axios';
import { useEffect, useState } from 'react';
import { boxes_img } from '../assets';
import Data from '../components/Data';
import Details from '../components/Details';
import ErrorHandler from '../components/ErrorHandler';
import Final from '../components/Final';
import Form from "../components/Form";
import Loader from '../components/Loader';
import MyTableContainer from '../components/MyTableContainer';
import TableComponent from '../components/TableComponent';
import { FaBell, FaRegUserCircle } from 'react-icons/fa';
import { useAuth } from '../AuthProvider';
import { useNavigate } from 'react-router-dom';

const formatDate = (dateString) => {
  const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const Summary = () => {
  const auth = useAuth();
  const navigate=useNavigate();
  const [toggle, setToggle] = useState(2);
  const [form, setForm] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // useEffect(() => {
  //   const fetchActiveData = async () => {
  //     try {
  //       const response = await axios.get('https://homecalculatorbackend-ni04.onrender.com/api/tenders/getactivetenders');
  //       setData(response.data);
  //       console.log(response.data);
  //     } catch (err) {
  //       setError(true);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchActiveData();
  // }, []);

  // const activeRecord = data.map((record) => ({
  //   id: record.tenderId,
  //   name: record.name,
  //   originaddress: record.originaddress,
  //   destinationaddress: record.destinationaddress,
  //   transportdate: formatDate(record.transportdate),
  //   arrivaldate: formatDate(record.arrivaldate),
  //   starttime: record.starthours,
  //   endtime: record.endhours,
  //   movingPrice: record.movingPrice,
  //   phonenumber: record.phonenumber,
  //   tenderStatus: record.tenderStatus,
  //   details: record.details,
  // })) || [];

  // console.log(activeRecord);

  // const columns = [
  //   {
  //     field: "id", headerName: "Tender ID", minWidth: 100, renderCell: (params) => {

  //       return <span style={{ whiteSpace: "pre-wrap" }} className="table_first_column">
  //         {params.id}
  //       </span>
  //     },
  //   },
  //   {
  //     field: "tenderStatus", headerName: "Tender Status", minWidth: 150,
  //     renderCell: (params) => {

  //       return <span style={{ whiteSpace: "pre-wrap" }} className="table_first_column">
  //         {params?.row?.tenderStatus}
  //       </span>
  //     },
  //   },
  //   {
  //     field: "movingPrice", headerName: "Moving Price", minWidth: 150,
  //     renderCell: (params) => {

  //       return <span style={{ whiteSpace: "pre-wrap" }} className="table_first_column">
  //         {params?.row?.movingPrice}
  //       </span>
  //     },
  //   },
  //   {
  //     field: "originaddress", headerName: "Origin Address", minWidth: 250,
  //     renderCell: (params) => {

  //       return <span style={{ whiteSpace: "pre-wrap", color: "#C15C7A" }} className="table_first_column" > {params?.row?.originaddress}</span>
  //     },
  //   },
  //   {
  //     field: "destinationaddress", headerName: "Destination Address", minWidth: 250,
  //     renderCell: (params) => {

  //       return <span style={{ whiteSpace: "pre-wrap", color: "#046E86" }} className="table_first_column" >{params?.row?.destinationaddress}</span>
  //     },
  //   },
  //   {
  //     field: "date", headerName: "Date", minWidth: 200,
  //     renderCell: (params) => {

  //       return <span style={{ whiteSpace: "pre-wrap" }} className="table_first_column" >{params?.row?.transportdate} - {params?.row?.arrivaldate}</span>
  //     },
  //   },
  //   {
  //     field: "hours", headerName: "Hours", minWidth: 150,
  //     renderCell: (params) => {

  //       return <span style={{ whiteSpace: "pre-wrap" }} className="table_first_column" >{params?.row?.starttime} - {params?.row?.endtime}</span>
  //     },
  //   },
  //   {
  //     field: "tenderdetails", headerName: "Tender Details", minWidth: 150,
  //     renderCell: (params) => {
  //       const onView = () => handleRowClick(params);
  //       return <span style={{ whiteSpace: "pre-wrap", textDecoration: "underline", color: "#1546F3" }} className="table_first_column" onClick={onView}>Open tender details</span>
  //     },
  //   },
  //   {
  //     field: "action", headerName: "Action", minWidth: 150,
  //     renderCell: (params) => {
  //       const onView = () => handleformRowClick(params);
  //       return <span style={{ whiteSpace: "pre-wrap" }} className="table_first_column" onClick={onView}><button className="bg-orange-400 rounded-lg px-2 text-white">submit offer</button></span>
  //     },
  //   },
  // ];

  const handleRowClick = (params) => {
    setSelectedHistory(params?.row?.details);
    setDialogOpen(true);
    // setRequest_id(params?.row?.id);
  };

  const toggleForm = () => {
    navigate('/userlogin');
    // setForm(true);
  };

  const toggleSummary = () => {
    setForm(false);
  };

  return (
    <div className=" h-full">
      <div className="flex justify-center items-center gap-6 text-neutral-50 text-xl text-center md:mt-14">
        {!form && (
          <div className='flex md:flex-row flex-col'>
            <button onClick={() => setToggle(0)} className={`w-40 h-12 ${toggle === 0 ? 'bg-orange-400' : ' bg-gray-400'} p-2 rounded-lg text-sm font-semibold mx-2 my-2`}>Recommendations & tips</button>
            <button onClick={() => setToggle(1)} className={`w-40 h-12 ${toggle === 1 ? 'bg-orange-400' : ' bg-gray-400'} p-2 rounded-lg text-sm font-semibold mx-2 my-2`}>Cost breakdown</button>
            <button onClick={() => setToggle(2)} className={`w-40 h-12 ${toggle === 2 ? 'bg-orange-400' : ' bg-gray-400'} p-2 rounded-lg text-sm font-semibold mx-2 my-2`}>Summary</button>
            {/* <button onClick={() => setToggle(3)} className={`w-40 h-12 ${toggle === 3 ? 'bg-orange-400' : ' bg-gray-400'} p-2 rounded-lg text-sm font-semibold`}>Tenders</button> */}
            {/* <button onClick={() => setToggle(4)} className={`w-40 h-auto ${toggle === 4 ? 'bg-orange-400' : ' bg-gray-400'} p-2 rounded-lg text-sm font-semibold`}>Approved tenders</button> */}
            <div className="flex items-center max-md:w-14 max-md:h-14 w-20 h-20 bg-red-500 rounded- full font-semibold shadow-2xl p-5 max-md:p-3 text-white text-lg max-md:text-sm mx-2 my-2" onClick={toggleForm}>Create Tender</div>
          </div>
        )}
      </div>
      <div className="mx-10 my-10">
        {!form && (
          <>
            {/* Red circle with outer shadow */}

            {toggle === 2 && (
              <div className='flex flex-col justify-center items-center gap-3'>
                <Final />
              </div>
            )}

            {toggle === 1 && (
              <div className='flex flex-col items-center justify-center gap-3 mt-10'>
                <Details />
                <TableComponent />
              </div>
            )}

            {toggle === 0 && (
              <div className=' flex flex-col items-center justify-center gap-3 mt-10'>
                <Data />
              </div>
            )}
            {/* Background image */}
            <img src={boxes_img} alt="background" className='w-full' />
          </>
        )}
      </div>
      {form && <Form toggleSummary={toggleSummary} />}
    </div>
  );
};

export default Summary;
