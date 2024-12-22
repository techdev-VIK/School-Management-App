

export default function School(){

    const {students, status, error} = useSelector((state) => state.students);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchStudents())
    }, []);

    return(
        <div>
            {status === "loading" && <p>Loading...</p>}
            {status === "error" && <p>{error}</p>}
        </div>
    )
}


