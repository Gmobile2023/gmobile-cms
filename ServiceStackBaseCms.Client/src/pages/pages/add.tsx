import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from "../../store/slices/themeConfigSlice";
import { ErrorSummary, SelectInput, TextAreaInput, TextInput } from '@/components/Form';
import { serializeToObject } from '@servicestack/client';
import { createNewPage } from '@/services/pageService';

const NewPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(setPageTitle('Thêm mới'));
    });

    // State for form inputs
    const [formState, setFormState] = useState({
        title: '',
        permalink: '',
        short_description: '',
        content: '',
        status: 0,
    });

    const onSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = serializeToObject(e.currentTarget);
        formData.status = formData.status * 1;
        const result = await createNewPage(formData);

        if (result.success) {
            navigate('/pages')
        } else {
            console.log(result)
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    return (<form onSubmit={onSubmit}>
        <div className="flex xl:flex-row flex-col gap-2.5">
            <div className="panel px-0 flex-1 py-6 ltr:xl:mr-6 rtl:xl:ml-6">
                <ErrorSummary except="" />
                <div className="px-4">
                    <label className="required" htmlFor="title">Tiêu đề</label>
                    <TextInput
                        id="title"
                        autoComplete="off"
                        label=""
                        className="form-input flex-1"
                        placeholder="Nhập Tiêu đề"
                        value={formState.title}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mt-4 px-4">
                    <label className="required" htmlFor="permalink">Permalink</label>
                    <TextInput
                        id="permalink"
                        autoComplete="off"
                        label=""
                        className="form-input flex-1"
                        placeholder="Permalink"
                        value={formState.permalink}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mt-8 px-4">
                    <label htmlFor="short_description">Mô tả ngắn</label>
                    <TextAreaInput 
                        id="short_description" 
                        className="form-textarea min-h-[70px]" 
                        label="" 
                        placeholder="Nhập Mô tả ngắn"
                        value={formState.short_description}
                        onChange={handleInputChange}
                    ></TextAreaInput>
                </div>
                <div className="mt-8 px-4">
                    <label className="required" htmlFor="content">Nội dung</label>
                    <TextAreaInput
                        id="content"
                        className="form-textarea min-h-[150px]"
                        label=""
                        placeholder="Nhập Nội dung"
                        value={formState.content}
                        onChange={handleInputChange}
                    ></TextAreaInput>
                </div>
            </div>
            <div className="xl:w-96 w-full xl:mt-0 mt-6">
                <div className="panel mb-5">
                    <div className="">
                        <label className="required" htmlFor="status">Trạng thái</label>
                        <SelectInput
                            id="status"
                            label=""
                            className="form-select"
                            value={formState.status}
                            options={{
                                0: "Nháp",
                                1: "Xuất bản",
                            }}
                            onChange={handleInputChange}
                        ></SelectInput>
                    </div>
                </div>
                <div className="panel">
                    <div className="grid xl:grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
                        <button type="submit" className="btn btn-success w-full gap-2">
                            Lưu & Xuất bản
                        </button>

                        <Link to="/pages" className="btn btn-primary w-full gap-2">
                            Quay lại
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </form>
    );
};

export default NewPage;