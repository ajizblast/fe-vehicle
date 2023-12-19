import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Table,
} from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { BsFillFilePersonFill} from "react-icons/bs";
import { API } from "../config/api";

export default function Home() {

  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let navigate = useNavigate();
  const [filter, setFilter] = useState([]);

  let { data: fachData, refetch } = useQuery("fachData", async () => {
    const response = await API.get("/vehicles");
    setFilter(response.data)
    return response.data;
  });

  console.log(fachData)

  const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
  };

  const handleDeletes = () => {
    setConfirmDelete(true);
  };

  //search
  const [form, setForm] = useState({
    registrationNumber: "",
    ownerName: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify(form);
      const response = await API.post("/search" , body, config );

      if (response.status === 200) {
        setFilter(response.data)
      }
    } catch (error) {
    }
  });
  
  const deleteById = useMutation(async (id) => {
    try {
      await API.delete("/vehicle/" + id);
      refetch();
    } catch (error) {
    }
  });

  useEffect(() => {
    if (confirmDelete) {
      handleClose();
      deleteById.mutate(idDelete);
      setConfirmDelete(null);
    }
  }, [confirmDelete]);

  useEffect(() => {
    if (form.registrationNumber === "" && form.ownerName === "0") {
      setFilter(fachData)
    }
  }, [fachData]);

  const handleDetail = (id) => {
    navigate("/detail/" + id);
  };
  const handleUpdate = (id) => {
    navigate("/edit/" + id);
  };

  // // umur
  // function getAge(dateString) {
  //   var today = new Date();
  //   var birthDate = new Date(dateString);
  //   var age = today.getFullYear() - birthDate.getFullYear();
  //   var m = today.getMonth() - birthDate.getMonth();
  //   if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
  //     age--;
  //   }
  //   return age;
  // }

  return (
    <div>
      <Container className="mt-3 ">
        <h3>
          <span>
          <BsFillFilePersonFill style={{ width: "30px",color: "grey" }} className="mb-2 me-3" alt="" />
          </span>
          Aplikasi Data Kendaraan
        </h3>
        <Card className=" bg-search">
          <Card.Body>
            <Form onSubmit={(e) => handleSubmit.mutate(e)}>
              <Form.Group>
                <Form.Label className="t fw-bolder opacity-75">
                  No Registrasi
                </Form.Label>
                <Form.Control
                  type="text"
                  id="registrationNumber"
                  name="registrationNumber"
                  style={{ width: "30%" }}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="fw-bolder opacity-75 mt-2">
                  Nama Pemilik
                </Form.Label>
                <Form.Control
                  type="text"
                  id="ownerName"
                  name="ownerName"
                  onChange={handleChange}
                  style={{ width: "30%" }}
                />
              </Form.Group>
           <Col className="text-end">
          <Button
          type="submit"
              variant="primary"
              className="my-2 fw-bolder me-3"
              style={{ width: "10%" }}
            >
              Search
            </Button>
            <Button
              variant="primary"
              className="my-2 fw-bolder"
              style={{ width: "10%" }}
              onClick={() => navigate("/add")}
            >
              Add
            </Button>
        </Col>
            </Form>
          </Card.Body>
        </Card>
        <Table size="lg" striped bordered hover>
                <thead>
                  <tr
                    style={{
                      height: "1rem",
                      backgroundColor: "#bac5e1",
                    }}
                  >
                    <th width="1%" className="text-center">
                      No
                    </th>
                    <th>No Registrasi</th>
                    <th>Nama Pemilik</th>
                    <th>Merk Kendaraan</th>
                    <th>Tahun Pembuatan</th>
                    <th>Kapasitas</th>
                    <th>Warna</th>
                    <th>Bahan Bakar</th>
                    <th style={{ width: "10rem", textAlign: "center" }}>
                      Action
                    </th>
                  </tr>
                </thead>
           <tbody>

            {filter?.slice().reverse().map((data, index) => (
              <tr key={index} className="opacity-75">
                <td>{index + 1}</td>
                <td>{data?.registrationNumber}</td>
                <td>{data?.ownerName}</td>
                <td>{data?.vehicleBrand}</td>
                <td>{data?.productionYear}</td>
                <td>{data?.cylinderCapacity}</td>
                <td>{data?.vehicleColor}</td>
                <td>{data?.fuel}</td>
                <td className="d-flex gap-3">
                  <div
                    className="text-warning pointer"
                    onClick={() => handleDetail(index + 1)}
                  >
                    Detail
                  </div>
                  <div
                    className="text-primary pointer "
                    onClick={() => {
                      handleUpdate(index + 1);
                    }}
                  >
                    Edit
                  </div>
                  <div
                    className="text-danger pointer"
                    onClick={() => {
                      handleDelete(index + 1);
                    }}
                  >
                    Hapus
                  </div>
                  <Modal show={show} onHide={handleClose} centered>
                    <Modal.Body>
                      <h3 className="text-center">Hapus</h3>
                      <div className="my-4"> Anda yakin ingin menghapus data yang dipilih ?</div>
                      <div className="my-3 text-end">
                        <Button
                          variant="danger"
                          className="me-2"
                          style={{ width: "100px" }}
                          onClick={handleDeletes}
                        >
                          Ok
                        </Button>
                        <Button
                          variant="secondary"
                          style={{ width: "100px" }}
                          onClick={handleClose}
                        >
                          Batal
                        </Button>
                      </div>
                    </Modal.Body>
                  </Modal>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}
