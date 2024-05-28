import React, { useEffect, useState} from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Image, Input, Button, Row, Col, Table, Modal, Tooltip, Upload } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import "./style.css";
import { useNavigate } from "react-router-dom";
import Toolbar from "./Toolbar";
import axios from "axios";
import { URL_API } from "../../config/constants";
import TextArea from "antd/es/input/TextArea";
import { userService } from "../../service/user";
import { formatter } from "../../service/format";
import {toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const { confirm } = Modal;

const columnsLeft = [
	{
		title: '#',
		dataIndex: 'stt'
	},
	{
		title: 'Tên sản phẩm',
		dataIndex: 'name',
	},
	{
		title: 'Ảnh minh họa',
		dataIndex: 'imageUrl',
	},
	{
		title: 'Giá nhập sản phẩm',
		dataIndex: 'cost',
	},
	{
		title: 'Giá bán sản phẩm',
		dataIndex: 'price',
	},
	{
		title: 'Số lượng',
		dataIndex: 'quantity',
	},
	{
		title: '',
		dataIndex: 'delete',
	},
	{
		title: '',
		dataIndex: 'edit',
	},
];

const AdminManage = () => {

	toast.configure()

	// const initData = [
	// 	{
	// 		id: 1,
	// 		name: 'shoe 1',
	// 		imageUrl: '/image/shoe1.png',
	// 		price: 1260000,
	// 		quantity: 100,
	// 		description: 'day la shoe 1'
	// 	},
	// 	{
	// 		id: 2,
	// 		name: 'shoe 2',
	// 		imageUrl: '/image/shoe2.png',
	// 		price: 2260000,
	// 		quantity: 100,
	// 		description: 'day la shoe 2'
	// 	},
	// 	{
	// 		id: 3,
	// 		name: 'shoe 3',
	// 		imageUrl: '/image/shoe3.png',
	// 		price: 3260000,
	// 		quantity: 100,
	// 		description: 'day la shoe 3'
	// 	},
	// 	{
	// 		id: 4,
	// 		name: 'shoe 4',
	// 		imageUrl: '/image/shoe4.png',
	// 		price: 4260000,
	// 		quantity: 100,
	// 		description: 'day la shoe 4'
	// 	}
	// ]

	const [dataLeft, setDataLeft] = useState([]);

	const getDataShoe = async () => {
		await axios.get(`${URL_API}/shoe/getAll`)
					.then( res => {
						if ( res.data.statusCode=='OK' ) {
							let shoes = [];
							const data = res.data.data;
							for( let i = 0; i < data.length; i++ ) {
								shoes.push ({
									id: data[i].id,
									name : data[i].name,
									imageUrl: <Image src={data[i].imageUrl} preview={false} width={140} />,
									price: formatter.format(data[i].price),
									cost: formatter.format(data[i].cost),
									quantity: data[i].quantity,
									delete: <Tooltip title='Xóa'><Image onClick={() => showDelConfirm(data[i].id, data[i].name)} className="icon-delete" src = '/image/delete.png' preview = {false} /></Tooltip>,
									edit: <Tooltip title='Sửa'><Image onClick={() => onOpenModalEdit(data[i])} className="icon-edit" src = '/image/edit.png' preview = {false} /></Tooltip>
								})
							}
							setDataLeft(shoes);
						}
					}).catch(err => console.log(err))
	}

	// const temp = () => {
	// 	let shoes = [];
	// 	const data = [...initData]
	// 	for( let i = 0; i < data.length; i++ ) {
	// 		shoes.push ({
	// 			id: data[i].id,
	// 			name : data[i].name,
	// 			imageUrl: <Image src={data[i].imageUrl} preview={false} width={140} />,
	// 			price: formatter.format(data[i].price),
	// 			quantity: data[i].quantity,
	// 			delete: <Tooltip title='Xóa'><Image onClick={() => showDelConfirm(data[i].id, data[i].name)} className="icon-delete" src = '/image/delete.png' preview = {false} /></Tooltip>,
	// 			edit: <Tooltip title='Sửa'><Image onClick={() => onOpenModalEdit(data[i])} className="icon-edit" src = '/image/edit.png' preview = {false} /></Tooltip>
	// 		})
	// 	}
	// 	setDataLeft(shoes);
	// }

	useEffect(() => {
		getDataShoe()
	}, [])

	const onOpenModalEdit = (shoe) => {
		setModeModal('edit');
		setNameShoeModal(shoe.name);
		setPriceShoeModal(shoe.price);
		setCostShoeModal(shoe.cost);
		setNoteModal(shoe.description);
		setImageUrlModal(shoe.imageUrl);
		setFileList([{
			uid: '-1',
			name: 'image-shoe',
			status: 'done',
			url: shoe.imageUrl,
		}])
		setQuantityModal(shoe.quantity)
		setIdEdit(shoe.id)
		setOpen(true)
	}

	const [nameShoeModal, setNameShoeModal] = useState('');
	const [priceShoeModal, setPriceShoeModal] = useState('');
	const [costShoeModal, setCostShoeModal] = useState('');
	const [imageUrlModal, setImageUrlModal] = useState('');
	const [noteModal, setNoteModal] = useState('');
	const [quantityModal, setQuantityModal] = useState('');	

	const clearForm = () => {
		setNameShoeModal('');
		setPriceShoeModal('');
		setCostShoeModal('');
		setImageUrlModal('');
		setNoteModal('');
		setQuantityModal('');
		setFileList([])
	}

	const [idEdit, setIdEdit] = useState();

	const editShoe = async () => {
		await axios.post(`${URL_API}/shoe/update`,{
			id: idEdit,
			name: nameShoeModal,
			price: priceShoeModal,
			cost: costShoeModal,
			description: noteModal,
			imageUrl: fileList[0].url,
			quantity: quantityModal
		}).then( res => {
			if ( res.data.statusCode=='OK' ) {
				toast.success('Sửa giày thành công', {
					position: toast.POSITION.TOP_CENTER
				})
				getDataShoe();
				clearForm()
			}
		}).catch( err => console.log(err))
		handleClose();
	}

	const delShoe = async (id) => {
		await axios.post(`${URL_API}/shoe/delete`, {
			id: id
		}).then( res => {
			if ( res.data.statusCode=='OK' ) {
				toast.success('Xóa giày thành công', {
					position: toast.POSITION.TOP_CENTER
				})
				getDataShoe();
			}
		}).catch( err => console.log(err))
	}

	const showDelConfirm = (id, title) => {
		confirm({
			title: 'Bạn có chắc chắn muôn xóa ' + title,
			icon: <ExclamationCircleFilled />,
			content: '',
			okText: 'Xóa',
			okType: 'danger',
			cancelText: 'Không',
			onOk() {
				delShoe(id)
			},
			onCancel() {
				console.log('Cancel');
			},
		})
	}

	const [selectedRowKeysLeft, setSelectedRowKeysLeft] = useState([]);
	const onSelectChangeLeft = (newSelectedRowKeys) => {
		console.log('selectedRowKeys changed: ', newSelectedRowKeys);
		setSelectedRowKeysLeft(newSelectedRowKeys);
	};
	const rowSelectionLeft = {
		selectedRowKeysLeft,
		onChange: onSelectChangeLeft,
		selections: [
			Table.SELECTION_ALL,
			Table.SELECTION_INVERT,
			Table.SELECTION_NONE,
			{
				key: 'odd',
				text: 'Select Odd Row',
				onSelect: (changableRowKeys) => {
					let newSelectedRowKeys = [];
					newSelectedRowKeys = changableRowKeys.filter((_, index) => {
						if (index % 2 !== 0) {
							return false;
						}
						return true;
					});
					setSelectedRowKeysLeft(newSelectedRowKeys);
				},
			},
			{
				key: 'even',
				text: 'Select Even Row',
				onSelect: (changableRowKeys) => {
					let newSelectedRowKeys = [];
					newSelectedRowKeys = changableRowKeys.filter((_, index) => {
						if (index % 2 !== 0) {
						return true;
						}
						return false;
					});
					setSelectedRowKeysLeft(newSelectedRowKeys);
				},
			},
		],
	};

	const user = userService.get();

	const handleAddShoe = async () => {
		await axios.post(`${URL_API}/shoe/create`, {
			name : nameShoeModal,
			imageUrl: fileList[0].url,
			price: priceShoeModal,
			cost: costShoeModal,
			quantity: quantityModal,
			description: noteModal,
			userId: user.id
		}).then( res => {
			if ( res.data.statusCode=='OK' ) {
				toast.success('Thêm giày thành công', {
					position: toast.POSITION.TOP_CENTER
				})
				getDataShoe();
				clearForm()
			}
		}).catch( err => console.log(err))
        handleClose();
    }
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => {
		setModeModal('add');
		clearForm();
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const [modeModal, setModeModal] = useState('add');

	const [isModalOpen, setIsModalOpen ] = useState(false);

	const handleOk = () => {
		setIsModalOpen(true);
	}

	const handleCancel = () => {
		setIsModalOpen(false)
	}

	const [fileList, setFileList] = useState([]);

	const onChange = ({ fileList: newFileList }) => {
		if ( newFileList.length > 0 )
			setFileList([{
				uid: '-1',
				name: 'image-shoe',
				status: 'done',
				url: `/image/${newFileList[0].name}`,
			}]);
		else 
			setFileList(newFileList)
		console.log(newFileList);
	};

	return (
		<div >
		<Row>
			<Col span={4}>
			<Toolbar />
			</Col>
			<Col span={18}>
				<Row className=''>
					<Col className='left' span={24}>
						<div className="search-add">
							<Input.Search
								allowClear
								style={{
									width: '50%',
								}}
								defaultValue=""
								placeholder='Tìm kiếm'
								
							/>
							<Button onClick={handleOpen} className='btn-add-tbleft'>Thêm sản phẩm</Button>
							<Modal title={modeModal=='add' ? 'Thêm sản phẩm' : 'Chỉnh sửa sản phẩm'} visible={open}
								onOk={modeModal=='add' ? handleAddShoe : editShoe } onCancel={handleClose}>
									<Row>
										<p>Tên sản phẩm</p>
										<Input value={nameShoeModal} onChange={(e) => setNameShoeModal(e.target.value)}  placeholder="Nhập tên sản phẩm" />
									</Row>
									<p>Ảnh minh họa</p>
									{/* <Input type="file" onChange={(e) => setImageUrlModal(e.target.value)}  placeholder="Chọn ảnh" />
										*/}
									<Upload
										action="//jsonplaceholder.typicode.com/posts/"
										listType="picture"
										fileList={fileList}
										onChange={onChange}
										previewFile={false}
										width={100}
									>
										{fileList.length < 1 && <Button>+ Upload</Button>}
									</Upload>
									<Row>
										<p>Mô tả</p>
										<TextArea rows={5} value={noteModal} onChange={(e) => setNoteModal(e.target.value)} placeholder="mô tả" />
									</Row>
									<Row style={{marginTop: 10}}>
										<p>Giá nhập sản phẩm</p>
										<Input value={costShoeModal} onChange={(e) => setCostShoeModal(e.target.value)}  placeholder="Nhập giá nhập sản phẩm" />
									</Row>
									<Row style={{marginTop: 10}}>
										<p>Giá bán sản phẩm</p>
										<Input value={priceShoeModal} onChange={(e) => setPriceShoeModal(e.target.value)}  placeholder="Nhập giá bán sản phẩm" />
									</Row>
									<Row style={{marginTop: 10}}>
										<p>Số lượng</p>
										<Input value={quantityModal} onChange={(e) => setQuantityModal(e.target.value)}  placeholder="Nhập số lượng sản phẩm" />
									</Row>
							</Modal>
							<Modal 
								title="Bạn có chắc chắn muốn xóa không" 
								visible={isModalOpen} 
								onOk={handleOk} 
								onCancel={handleCancel}>
							</Modal>
						</div>
						<Table 
							className='table-left' 
							rowSelection={rowSelectionLeft} 
							columns={columnsLeft} 
							dataSource={dataLeft} 
							pagination={{
								defaultPageSize: 5
							}}
						/>
					</Col>
					
				</Row>
			</Col>
		</Row>
		</div>
	);
};

export default AdminManage;
