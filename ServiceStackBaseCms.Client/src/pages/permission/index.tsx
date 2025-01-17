import { setPageTitle } from "@/store/slices/themeConfigSlice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import IconX from "@/components/Icon/IconX";
import { SelectInput, TextInput } from "@/components/Form";
// import {
//     CreateRoleClaims,
//     getRoleClaims,
//     getRoles,
//     UpdateRoleClaims,
// } from "@/services/rolesService";
import { Button, Menu } from "@mantine/core";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import Swal from "sweetalert2";

const Permission = () => {
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const [roleClaims, setRoleClaims] = useState([]);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: "id",
        direction: "asc",
    });

    useEffect(() => {
        dispatch(setPageTitle("Quản lý quyền"));
        // getAllRoleClaims();
    }, []);

    const [defaultParams] = useState({
        id: null,
        roleId: "",
        claimValue: "",
    });

    const [params, setParams] = useState<any>(
        JSON.parse(JSON.stringify(defaultParams))
    );

    // const getAllRoleClaims = async () => {
    //     try {
    //         const response = await getRoleClaims();
    //         if (response.success) {
    //             setRoleClaims(response.response.results || []);
    //             // console.log(response);
    //         } else {
    //             // setError(api.error);
    //             console.log(response);
    //         }
    //     } catch (err) {
    //         console.error(err);
    //         // setError(err);
    //     } finally {
    //         // setLoading(false);
    //     }
    // };

    const handleDelete = (record: any) => {
        console.log("Delete record:", record);
    };

    const openModal = () => {
        setModal(true);
    };

    const changeValue = (e: any) => {
        const { value, id } = e.target;
        setParams({ ...params, [id]: value });
    };

    const handleEditPermission = (data: any = null) => {
        const json = JSON.parse(JSON.stringify(defaultParams));
        setParams(json);
        if (data) {
            let json1 = JSON.parse(JSON.stringify(data));
            setParams(json1);
        }
        openModal();
    };

    // const handleSubmit = async () => {
    //     if (params.id) {
    //         // Update role
    //         let data = {
    //             id: params.id,
    //             roleId: params.roleId,
    //             claimValue: params.claimValue,
    //         };
    //         const api = await UpdateRoleClaims(data);
    //         if (api.response) {
    //             showMessage("Cập nhật thành công!");
    //             getAllRoleClaims();
    //         }
    //     } else {
    //         // Create role
    //         let data = {
    //             roleId: params.roleId,
    //             claimValue: params.claimValue,
    //         };
    //         const api = await CreateRoleClaims(data);
    //         if (api.response) {
    //             showMessage("Tạo thành công!");
    //             getAllRoleClaims();
    //         }
    //     }
    //     setParams(defaultParams);
    //     setModal(false);
    // };

    const showMessage = (msg = "", type = "success") => {
        const toast: any = Swal.mixin({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000,
            customClass: { container: "toast" },
        });
        toast.fire({
            icon: type,
            title: msg,
            padding: "10px 20px",
        });
    };

    return (
        <>
            <div>
                <div className="panel">
                    <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">
                            Quản lý quyền
                        </h5>
                        <div className="ml-auto">
                            <Button
                                variant="filled"
                                color="blue"
                                onClick={openModal}
                            >
                                Thêm mới
                            </Button>
                        </div>
                    </div>
                    <div className="datatables">
                        <DataTable
                            className="whitespace-nowrap table-hover"
                            records={roleClaims}
                            columns={[
                                {
                                    accessor: "action",
                                    title: "Hành động",
                                    render: (record) => (
                                        <Menu>
                                            <Menu.Target>
                                                <Button size="xs">
                                                    Hành động
                                                </Button>
                                            </Menu.Target>
                                            <Menu.Dropdown>
                                                <Menu.Item
                                                    color="red"
                                                    onClick={() =>
                                                        handleEditPermission(
                                                            record
                                                        )
                                                    }
                                                >
                                                    Chỉnh sửa
                                                </Menu.Item>
                                                <Menu.Item
                                                    color="red"
                                                    onClick={() =>
                                                        handleDelete(record)
                                                    }
                                                >
                                                    Xoá
                                                </Menu.Item>
                                            </Menu.Dropdown>
                                        </Menu>
                                    ),
                                },
                                {
                                    accessor: "claimValue",
                                    sortable: true,
                                    title: "Tên",
                                },
                            ]}
                            highlightOnHover
                            totalRecords={0}
                            recordsPerPage={pageSize}
                            page={page}
                            onPageChange={(p) => setPage(p)}
                            recordsPerPageOptions={PAGE_SIZES}
                            onRecordsPerPageChange={setPageSize}
                            sortStatus={sortStatus}
                            onSortStatusChange={setSortStatus}
                            minHeight={200}
                            paginationText={({ from, to, totalRecords }) =>
                                `Hiển thị ${from} - ${to} / ${totalRecords} kết quả`
                            }
                        />
                    </div>
                </div>
                <Transition appear show={modal} as={Fragment}>
                    <Dialog
                        as="div"
                        open={modal}
                        onClose={() => setModal(false)}
                        className="relative z-[51]"
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-[black]/60" />
                        </Transition.Child>
                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center px-4 py-8">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                                        <button
                                            type="button"
                                            onClick={() => setModal(false)}
                                            className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                        >
                                            <IconX />
                                        </button>
                                        <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                            {!params.id
                                                ? "Thêm quyền"
                                                : "Sửa quyền"}
                                        </div>
                                        <div className="p-5">
                                            <form>
                                                <div className="mb-5">
                                                    <label htmlFor="claimValue">
                                                        Tên quyền
                                                    </label>
                                                    <input
                                                        id="claimValue"
                                                        type="text"
                                                        placeholder="Nhập họ"
                                                        className="form-input"
                                                        value={
                                                            params.claimValue
                                                        }
                                                        onChange={(e) =>
                                                            changeValue(e)
                                                        }
                                                    />
                                                </div>
                                                <div className="flex justify-end items-center mt-8">
                                                    <Button
                                                        variant="filled"
                                                        color="gray"
                                                        onClick={() =>
                                                            setModal(false)
                                                        }
                                                        className="me-2"
                                                    >
                                                        Huỷ
                                                    </Button>
                                                    <Button
                                                        variant="filled"
                                                        color="blue"
                                                        // onClick={handleSubmit}
                                                    >
                                                        {params.id
                                                            ? "Cập nhật"
                                                            : "Thêm mới"}
                                                    </Button>
                                                </div>
                                            </form>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>
        </>
    );
};

export default Permission;
