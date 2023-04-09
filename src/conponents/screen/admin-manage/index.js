import React, { useState} from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Image, Input, Button, Row, Col, Table, Modal, Tooltip  } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import "./style.css";
import { useNavigate } from "react-router-dom";
import Toolbar from "./Toolbar";

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
		dataIndex: 'amount',
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
		amount: 20,
		delete: <Tooltip title='Xóa'><Image src = '/image/delete.png' preview = {false} /></Tooltip>,
		edit: <Tooltip title='Sửa'><Image src = '/image/edit.png' preview = {false} /></Tooltip>
	},
	{
		name: "Nike 1",
		image: <Image src='/image/shoe12.png' preview={false} width={140} />,
		price: 1200,
		amount: 20,
		delete: <Tooltip title='Xóa'><Image src = '/image/delete.png' preview = {false} /></Tooltip>,
		edit: <Tooltip title='Sửa'><Image src = '/image/edit.png' preview = {false} /></Tooltip>
	},
	{
		name: "Nike 1",
		image: <Image src='/image/shoe13.png' preview={false} width={140} />,
		price: 1200,
		amount: 20,
		delete: <Tooltip title='Xóa'><Image src = '/image/delete.png' preview = {false} /></Tooltip>,
		edit: <Tooltip title='Sửa'><Image src = '/image/edit.png' preview = {false} /></Tooltip>
	},
	{
		name: "Nike 1",
		image: <Image src='/image/shoe14.png' preview={false} width={140} />,
		price: 1200,
		amount: 20,
		delete: <Tooltip title='Xóa'><Image src = '/image/delete.png' preview = {false} /></Tooltip>,
		edit: <Tooltip title='Sửa'><Image src = '/image/edit.png' preview = {false} /></Tooltip>
	},
]

const AdminManage = () => {
	const navigate = useNavigate();
	const [dataLeft, setDataLeft] = useState(data);

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

	const [ nameAdd, setNameAdd] = useState('');
	const [ priceAdd, setPriceAdd] = useState('');
	const [ amountAdd, setAmountAdd ] = useState('');
	const [ urlAdd, setUrlAdd] = useState('');

	const handleAddEvent = async () => {
		console.log(urlAdd);

		const tmp = urlAdd.split('\\');

		console.log(tmp);
		console.log(tmp[tmp.length - 1])

		const product = {
			name : nameAdd,
			image: <Image src={`/image/${tmp[tmp.length - 1]}`} preview={false} width={140} />,
			price: priceAdd,
			amount: amountAdd,
			delete: <Tooltip title='Xóa'><Image className="icon-delete" src = '/image/delete.png' preview = {false} /></Tooltip>,
			edit: <Tooltip title='Sửa'><Image className="icon-edit" src = '/image/edit.png' preview = {false} /></Tooltip>
		}

		setDataLeft(dataLeft => [...dataLeft, product])

        handleClose();
    }
	const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
	

	return (
		<div >
		<Row>
			<Col span={5}>
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
							<Modal title="Thêm sản phẩm" visible={open}
								onOk={handleAddEvent} onCancel={handleClose}>
									<Row>
										<p>Tên sản phẩm</p>
										<Input onChange={(e) => setNameAdd(e.target.value)}  placeholder="Nhập tên sản phẩm" />
									</Row>
									<Row>
										<p>Ảnh minh họa</p>
										<Input type="file" onChange={(e) => setUrlAdd(e.target.value)}  placeholder="Chọn ảnh" />
									</Row>
									<Row style={{marginTop: 10}}>
										<p>Giá sản phẩm</p>
										<Input onChange={(e) => setPriceAdd(e.target.value)}  placeholder="Nhập giá sản phẩm" />
									</Row>
									<Row style={{marginTop: 10}}>
										<p>Số lượng</p>
										<Input onChange={(e) => setAmountAdd(e.target.value)}  placeholder="Nhập số lượng sản phẩm" />
									</Row>
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
