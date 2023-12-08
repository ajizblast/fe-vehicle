import React, { useState, useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useMutation } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BsFillFilePersonFill} from "react-icons/bs";
import { API } from "../config/api";

export default function EditPages() {
  let navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    registrationNumber: "",
    ownerName: "",
    address: "",
    vehicleBrand: "",
    productionYear: "",
    vehicleColor: "",
    cylinderCapacity: "",
    fuel: "",
  });

  let getData = async () => {
    const response = await API.get("/data/" + id);
    setForm({
      ...form,
      registrationNumber: response.data.registrationNumber,
      name: response.data.name,
      address: response.data.address,
      vehicleBrand: response.data.vehicleBrand,
      productionYear: response.data.productionYear,
      vehicleColor: response.data.vehicleColor,
      cylinderCapacity: response.data.cylinderCapacity,
      fuel: response.data.fuel,
    });
  };
  
  useEffect(() => {
    getData();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      await API.patch("/data", form);
      alert("data berhasil dirubah");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div>
      <Container className="mt-3 opacity-75">
        <h3>
          <span>
          <BsFillFilePersonFill style={{ width: "30px" }} className="m-3"/>
          </span>
          Aplikasi Data Kendaraan
        </h3>
        <h5 className="my-3">Edit Data Kendaraan</h5>
        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
          <Row>
            <Col>
              <Row>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>No. Registrasi Kendaraan</Form.Label>
                    <Form.Control
                      type="text"
                      name="registrationNumber"
                      id="registrationNumber"
                      value={form.registrationNumber}
                      onChange={handleChange}
                      disabled
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Nama Pemilik</Form.Label>
                    <Form.Control
                      type="text"
                      name="ownerName"
                      id="ownerName"
                      value={form.ownerName}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Merk Kendaraan</Form.Label>
                    <Form.Control
                        type="text"
                        name="vehicleBrand"
                        id="vehicleBrand"
                        value={form.vehicleBrand}
                        onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Alamat Pemilik Kendaraan</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="address"
                        id="address"
                        value={form.address}
                        onChange={handleChange}
                    />
                  </Form.Group>


                </Col>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Tahun Pembuatan</Form.Label>
                    <Form.Control
                        type="text"
                        name="productionYear"
                        id="productionYear"
                        value={form.productionYear}
                        onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Kapasitas Silinder</Form.Label>
                    <Form.Control
                        type="text"
                        name="cylinderCapacity"
                        id="cylinderCapacity"
                        value={form.cylinderCapacity}
                        onChange={handleChange}
                    />
                  </Form.Group>

            <label htmlFor="color" className="mb-2 me-3">
            Warna Kendaraan
          </label>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:outline-orange-600 w-full px-4 py-2 mb-3"
            name="vehicleColor"
            id="vehicleColor"
            onChange={handleChange}
            value={form.vehicleColor}
          >
            <option selected disabled>
              Pilih Warna
            </option>
            <option value="Merah">Merah</option>
            <option value="Putih">Putih</option>
            <option value="Kuning">Kuning</option>
            <option value="Hijau">Hijau</option>
            <option value="Biru">Biru</option>
            <option value="Ungu">Ungu</option>
            <option value="Hitam">Hitam</option>
          </select>

                  <Form.Group className="mb-3">
                    <Form.Label>Bahan Bakar</Form.Label>
                    <Form.Control
                        type="text"
                        name="fuel"
                        id="fuel"
                        value={form.bensin}
                        onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button type="submit" style={{ width: "100px" }}>
                Edit
              </Button>
              <Link to={"/"}>
                <Button
                  variant="secondary"
                  className="ms-2"
                  style={{ width: "100px" }}
                >
                  Kembali
                </Button>
              </Link>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}
