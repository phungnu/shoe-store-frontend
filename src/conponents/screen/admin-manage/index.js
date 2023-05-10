import React, { useEffect, useState} from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Image, Input, Button, Row, Col, Table, Modal, Tooltip  } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import "./style.css";
import { useNavigate } from "react-router-dom";
import Toolbar from "./Toolbar";
import axios from "axios";
import { URL_API } from "../../config/constants";
import TextArea from "antd/es/input/TextArea";
import { userService } from "../../service/user";

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
		dataIndex: 'image',
	},
	{
		title: 'Giá sản phẩm',
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

const data = [
	{
		name: "Nike 1",
		image: <Image src='/image/shoe11.png' preview={false} width={140} />,
		price: 1200,
		quantity: 20,
		delete: <Tooltip title='Xóa'><Image src = '/image/delete.png' preview = {false} /></Tooltip>,
		edit: <Tooltip title='Sửa'><Image src = '/image/edit.png' preview = {false} /></Tooltip>
	},
	{
		name: "Nike 1",
		image: <Image src='/image/shoe12.png' preview={false} width={140} />,
		price: 1200,
		quantity: 20,
		delete: <Tooltip title='Xóa'><Image src = '/image/delete.png' preview = {false} /></Tooltip>,
		edit: <Tooltip title='Sửa'><Image src = '/image/edit.png' preview = {false} /></Tooltip>
	},
	{
		name: "Nike 1",
		image: <Image src='/image/shoe13.png' preview={false} width={140} />,
		price: 1200,
		quantity: 20,
		delete: <Tooltip title='Xóa'><Image src = '/image/delete.png' preview = {false} /></Tooltip>,
		edit: <Tooltip title='Sửa'><Image src = '/image/edit.png' preview = {false} /></Tooltip>
	},
	{
		name: "Nike 1",
		image: <Image src='/image/shoe14.png' preview={false} width={140} />,
		price: 1200,
		quantity: 20,
		delete: <Tooltip title='Xóa'><Image src = '/image/delete.png' preview = {false} /></Tooltip>,
		edit: <Tooltip title='Sửa'><Image src = '/image/edit.png' preview = {false} /></Tooltip>
	},
]

const AdminManage = () => {
	const [dataLeft, setDataLeft] = useState(data);

	// const getDataShoe = async () => {
	// 	await axios.get(`${URL_API}/shoe/getAll`)
	// 				.then( res => {
	// 					if ( res.data.statusCode=='OK' ) {
	// 						let shoes = [];
	// 						for( let i = 0; i < res.data.data.length; i++ ) {
	// 							shoes.push ({
	// 								id: res.data.data[i].id,
	// 								name : res.data.data[i].name,
	// 								imageUrl: <Image src={res.data.data[i].imageUrl} preview={false} width={140} />,
	// 								price: res.data.data[i].price,
	// 								quantity: res.data.data[i].price,
	// 								delete: <Tooltip title='Xóa'><Image onClick={() => showDelConfirm(id, name)} className="icon-delete" src = '/image/delete.png' preview = {false} /></Tooltip>,
	// 								edit: <Tooltip title='Sửa'><Image onClick={() => onOpenModalEdit(res.data.data[i])} className="icon-edit" src = '/image/edit.png' preview = {false} /></Tooltip>
	// 							})
	// 						}
	// 						setDataLeft(shoes);
	// 					}
	// 				}).catch(err => console.log(err))
	// }

	// useEffect(() => {
	// 	getDataShoe()
	// }, [])

	const onOpenModalEdit = () => {
		setModeModal('edit');
		setNameShoeModal('test name');
		setPriceShoeModal('200');
		setNoteModal('test note');
		setImageUrlModal('/test.png')
		setQuantityModal(100)
		setOpen(true)
	}

	const [nameShoeModal, setNameShoeModal] = useState('test name');
	const [priceShoeModal, setPriceShoeModal] = useState('');
	const [imageUrlModal, setImageUrlModal] = useState('./test.png');
	const [noteModal, setNoteModal] = useState('');
	const [quantityModal, setQuantityModal] = useState('');	


	const editShoe = async (shoe) => {
		await axios.post(`${URL_API}/shoe/update`,{
			id: shoe.id,
			name: shoe.name,
			price: shoe.price,
			description: shoe.description,
			imageUrl: shoe.imageUrl,
			quantity: shoe.quantity
		}). then( res => {
			if ( res.data.statusCode=='OK' ) {
				console.log('edit success');
				// await getDataShoe();
				
			}
		}). catch( err => console.log(err))
		handleClose();
	}

	const delShoe = async (id) => {
		await axios.post(`${URL_API}/shoe/delete`, {
			id: id
		}). then( res => {
			if ( res.data.statusCode=='OK' ) {
				console.log('delete success');
				// await getDataShoe();
			}
		}). catch( err => console.log(err))
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
		const tmp = imageUrlModal.split('\\');

		await axios.post(`${URL_API}/shoe`, {
			name : nameShoeModal,
			imageUrl: <Image src={`/image/${tmp[tmp.length - 1]}`} preview={false} width={140} />,
			price: priceShoeModal,
			quantity: quantityModal,
			description: noteModal,
			userId: user.id
		}). then( res => {
			if ( res.data.statusCode=='OK' ) {
				console.log('Add shoe success');
				// await getDataShoe();

			}
		}). catch( err => console.log(err))

		// const product = {
		// 	name : nameShoeModal,
		// 	imageUrl: <Image src={`/image/${tmp[tmp.length - 1]}`} preview={false} width={140} />,
		// 	price: priceShoeModal,
		// 	quantity: quantityModal,
		// 	delete: <Tooltip title='Xóa'><Image className="icon-delete" src = '/image/delete.png' preview = {false} /></Tooltip>,
		// 	edit: <Tooltip title='Sửa'><Image className="icon-edit" src = '/image/edit.png' preview = {false} /></Tooltip>
		// }

		// setDataLeft(dataLeft => [...dataLeft, product])

        handleClose();
    }
	const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

	const [modeModal, setModeModal] = useState('add');

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
									<Row>
										<p>Ảnh minh họa</p>
										<Input type="file" onChange={(e) => setImageUrlModal(e.target.value)}  placeholder="Chọn ảnh" />
									</Row>
									<Row>
										<p>Mô tả</p>
										<TextArea value={noteModal} onChange={(e) => setNoteModal(e.target.value)} placeholder="mô tả" />
									</Row>
									<Row style={{marginTop: 10}}>
										<p>Giá sản phẩm</p>
										<Input value={priceShoeModal} onChange={(e) => setPriceShoeModal(e.target.value)}  placeholder="Nhập giá sản phẩm" />
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
