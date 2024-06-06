import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiStar } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { FaBell } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { useAuth } from "../../AuthProvider";
import ErrorHandler from "../../components/ErrorHandler";
import Loader from "../../components/Loader";
import MyTableContainer from "../../components/MyTableContainer";
import StatusBadge from "../../utils/statusstyle";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import Final from "../../components/Final";
import Details from "../../components/Details";
import TableComponent from "../../components/TableComponent";
import Data from "../../components/Data";
import { setCompanyId } from "../../slices/companyslice";

const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

const UserDashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tenderId = useSelector(state => state.tender.tenderId);
    const auth = useAuth();
    const [userId, setuserId] = useState(auth?.user);
    const [toggle, setToggle] = useState(0);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [pendingdata, setpendingData] = useState([]);
    const [pendingloading, setpendingLoading] = useState(true);
    const [pendingerror, setpendingError] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [formdialogOpen, setformDialogOpen] = useState(false);
    const [selectedHistory, setSelectedHistory] = useState(null);
    const [isFinishButtonDisabled, setIsFinishButtonDisabled] = useState(false);
    const [isPendingButtonDisabled, setIsPendingButtonDisabled] = useState(false);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [currentTender, setCurrentTender] = useState(null);
    const [finishDialogOpen, setFinishDialogOpen] = useState(false);
    const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

    const [name, setname] = useState("");

    const fetchuserdata = async () => {
        try {
            const response = await axios.get(`https://homecalculatorbackend-ni04.onrender.com/api/users/${userId}`);
            setname(response?.data?.user?.name);
            console.log(response?.data?.user?.name);

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchuserdata();
    }, [userId]);


    const fetchActiveData = async () => {
        try {
            const response = await axios.get(`https://homecalculatorbackend-ni04.onrender.com/api/priceoffer/getoffers/${tenderId}`);
            setData(response.data);
            console.log(response.data);
            // Check if any tender's status is not 'Pending'
            const isAnyTenderNotPending = response.data.some(tender => tender.tenderStatus !== 'Confirmed');
            const isAnyTenderPending = response.data.some(tender => tender.tenderStatus === 'Confirmed');
            console.log(isAnyTenderNotPending);
            console.log(isAnyTenderPending);
            setIsFinishButtonDisabled(isAnyTenderNotPending);
            setIsPendingButtonDisabled(isAnyTenderPending);

        } catch (err) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchActiveData();
    }, [tenderId]);

    const activeRecord = data.map((record) => ({
        id: record.moverId,
        rating: record.companyDetails.rating,
        name: record.companyDetails.companyName,
        companyid: record.companyDetails.companyId,
        phonenumber: record.companyDetails.phoneNumber,
        transportdate: formatDate(record.transportDate),
        arrivaldate: formatDate(record.arrivalDate),
        starttime: record.startHours,
        endtime: record.endHours,
        tenderStatus: record.tenderStatus,
        orderconfirm: record.orderconfirm,
        priceOffer: record.priceOffer,
    })) || [];


    const columns = [
        {
            field: "id", headerName: "מזהה הובלן", minWidth: 100, renderCell: (params) => {

                return <span style={{ whiteSpace: "pre-wrap" }} className="table_first_column">
                    {params.id}
                </span>
            },
        },
        {
            field: "rating",
            headerName: "דירוג",

            minWidth: 150,
            renderCell: (params) => {
                return (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <CiStar size={30} style={{ color: 'gold' }} />
                        {params.row.rating}
                        <span>(10 ביקורות)</span>
                    </div>
                );
            },
        },
        {
            field: "tenderStatus", headerName: "סטטוס מכרז", minWidth: 150,
            renderCell: (params) => {

                return <span style={{ whiteSpace: "pre-wrap" }} className="table_first_column">
                    <StatusBadge status={params?.row?.tenderStatus} />
                </span>
            },
        },
        {
            field: "priceOffer", headerName: "הצעת מחיר", minWidth: 150,
            renderCell: (params) => {

                return <span style={{ whiteSpace: "pre-wrap", color: "#FC7023" }} className="table_first_column">
                    {params?.row?.priceOffer} ש"ח
                </span>
            },
        },
        {
            field: "date", headerName: "תאריך", minWidth: 200,
            renderCell: (params) => {

                return <span style={{ whiteSpace: "pre-wrap" }} className="table_first_column" >{params?.row?.transportdate} - {params?.row?.arrivaldate}</span>
            },
        },
        {
            field: "hours", headerName: "שעות", minWidth: 150,
            renderCell: (params) => {

                return <span style={{ whiteSpace: "pre-wrap" }} className="table_first_column" >{params?.row?.starttime} - {params?.row?.endtime}</span>
            },
        },
        {
            field: "name", headerName: "שם החברה", minWidth: 150,
            renderCell: (params) => {

                return <span style={{ whiteSpace: "pre-wrap" }} className="table_first_column" >{params.row.orderconfirm ? params?.row?.name : 'אשר את ההזמנה שלך'}</span>
            },
        },
        {
            field: "phonenumber", headerName: "מספר טלפון של החברה", minWidth: 150,
            renderCell: (params) => {

                return <span style={{ whiteSpace: "pre-wrap" }} className="table_first_column" >{params.row.orderconfirm ? params?.row?.phonenumber : 'אשר את ההזמנה שלך'}</span>
            },
        },
        {
            field: "action", headerName: "פעולה", minWidth: "150",
            renderCell: (params) => {
                const isPending = params?.row?.tenderStatus === "אושר";
                const isOrderConfirmed = params?.row?.orderconfirm === true;

                return (
                    <span style={{ whiteSpace: "pre-wrap" }} className="table_first_column">
                        <button
                            className={`rounded-lg px-2 text-white ${isPending ? 'bg-gray-400' : 'bg-orange-400'}`}
                            disabled={isPending}
                            onClick={() => handleConfirmOrderClick(params?.row)}
                        >
                            {isOrderConfirmed ? 'הזמנה מאושרת' : 'אישור הצעה'}
                        </button>
                    </span>
                );
            },
        }
    ];

    const handleConfirmOrderClick = (tender) => {
        setCurrentTender(tender);
        setConfirmDialogOpen(true);
    };

    const handleConfirmOk = async () => {
        console.log(currentTender);
        try {
            const response = await axios.post('https://homecalculatorbackend-ni04.onrender.com/api/priceoffer/updateStatusAndConfirm', {
                tenderId: tenderId,
                companyId: currentTender?.companyid
            });
            dispatch(setCompanyId(currentTender?.companyid));
            toast.success('אשר ההצעה בהצלחה');
            fetchActiveData(); // Refresh the data
        } catch (error) {
            toast.error('נכשל באישור ההצעה');
        }
        setConfirmDialogOpen(false);
    };

    const handleConfirmCancel = () => {
        setConfirmDialogOpen(false);
    };

    const handleFinishClick = () => {
        setFinishDialogOpen(true);
    };

    const handleCancelClick = () => {
        setCancelDialogOpen(true);
    };

    const handleFinishTender = async () => {
        try {
            const response = await axios.post(`https://homecalculatorbackend-ni04.onrender.com/api/tenders/finishTender/${tenderId}`);
            toast.success('המכרז הסתיים בהצלחה');
            navigate('/userreview')
        } catch (error) {
            toast.error('נכשל בסיום המכרז');
        }
        setFinishDialogOpen(false);
    };

    const handleCancelTender = async () => {
        try {
            const response = await axios.post(`https://homecalculatorbackend-ni04.onrender.com/api/tenders/cancelTender/${tenderId}`);
            toast.success('המכרז בוטל בהצלחה');
            navigate('/usercancelreview')
        } catch (error) {
            toast.error('נכשל בביטול המכרז');
        }
        setCancelDialogOpen(false);
    };

    return (
        <div className="bg-white h-full">
            <div className="bg-[#96E0F8] flex justify-between py-3">
                <div>
                    <h2 className='w-full text-xl bm-font'>לחץ <span className='text-orange-500 px-2'>n</span>Move</h2>
                </div>
                <div className="flex">
                    <FaBell className="mr-3" size={20} />
                    <FaRegUserCircle className="mr-3" size={20} />
                </div>
            </div>
            <div className="py-2 flex justify-between border-b border-black" style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
                {/* <h1>Welcome! {auth.user?.username}</h1> */}
                <div className="ml-3">
                    <h2>צהריים טובים, {name}</h2>
                    <h2>גש מהר למכרזים שלך</h2>
                </div>
                <button onClick={() => auth.logOut()} className="btn-submit">
                    התנתק
                </button>
            </div>
            <div className="flex justify-center items-center mt-5">
                <button onClick={() => setToggle(0)} className={`w-40 h-16 ${toggle === 0 ? 'bg-orange-400' : ' bg-gray-400'} py-4 px-2 rounded-lg text-sm mr-3 font-semibold`}>הצעות מחיר</button>
                <button onClick={() => setToggle(1)} className={`w-40 h-16 ${toggle === 1 ? 'bg-orange-400' : ' bg-gray-400'} py-4 px-2 rounded-lg text-sm mr-3 font-semibold`}>המלצות וטיפים</button>
                <button onClick={() => setToggle(2)} className={`w-40 h-16 ${toggle === 2 ? 'bg-orange-400' : ' bg-gray-400'} py-4 px-2 rounded-lg text-sm mr-3 font-semibold`}>פירוט עלויות</button>
                <button onClick={() => setToggle(3)} className={`w-40 h-16 ${toggle === 3 ? 'bg-orange-400' : ' bg-gray-400'} py-4 px-2 rounded-lg text-sm mr-3 font-semibold`}>סיכום</button>
            </div>
            <div className="flex justify-center items-center mt-5">
                <button className="bg-[#3E79E9] text-white py-2 px-2 rounded-lg mr-3 font-semibold" onClick={handleFinishClick} disabled={isFinishButtonDisabled}>סיום מכרז</button>
                <button className="bg-[#F78C8C] text-white py-2 px-2 rounded-lg mr-3 font-semibold" onClick={handleCancelClick} disabled={isPendingButtonDisabled}>ביטול מכרז</button>

            </div>
            <div className="mx-10 my-10">
                {loading ? <Loader placement={{ marginTop: '-100px' }} /> :
                    <>
                        {error ? <ErrorHandler online={navigator.onLine} /> :
                            activeRecord && toggle === 0 ?
                                <MyTableContainer columns={columns} data={activeRecord} RowFilterWith="id" customPageSize={25} minHeight="calc(100vh - 200px)" /> : null
                        }
                    </>
                }
                {toggle === 3 && (
                    <div className='flex flex-col justify-center items-center gap-3'>
                        <Final />
                    </div>
                )}
                {toggle === 2 && (
                    <div className='flex flex-col items-center justify-center gap-3 mt-10'>
                        <Details />
                        <TableComponent />
                    </div>
                )}
                {toggle === 1 && (
                    <div className=' flex flex-col items-center justify-center gap-3 mt-10'>
                        <Data />
                    </div>
                )}
            </div>
            <Dialog
                open={confirmDialogOpen}
                onClose={handleConfirmCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ?האם אתה בטוח שברצונך לאשר את ההצעה הזו
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirmCancel} color="primary">
                        ביטול
                    </Button>
                    <Button onClick={handleConfirmOk} color="primary" autoFocus>
                        אישור
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={finishDialogOpen} onClose={() => setFinishDialogOpen(false)}>
                <DialogContent>
                    <DialogContentText>
                        ?האם אתה בטוח שברצונך לסיים את המכרז הזה
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setFinishDialogOpen(false)} color="primary">
                        ביטול
                    </Button>
                    <Button onClick={handleFinishTender} color="primary" autoFocus>
                        אישור
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={cancelDialogOpen} onClose={() => setCancelDialogOpen(false)}>
                <DialogContent>
                    <DialogContentText>
                        ?האם אתה בטוח שברצונך לבטל את המכרז הזה
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setCancelDialogOpen(false)} color="primary">
                        ביטול
                    </Button>
                    <Button onClick={handleCancelTender} color="primary" autoFocus>
                        אישור
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default UserDashboard;