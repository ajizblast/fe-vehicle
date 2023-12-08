import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { BsFillFilePersonFill} from "react-icons/bs";
import { API } from "../config/api";

export default function AddPages() {
  let navigate = useNavigate();

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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleInput = (e) => {
    if (e.target.value.length > e.target.maxLength)
      e.target.value = e.target.value.slice(0, e.target.maxLength);
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      await API.post("/vehicle", form);
      alert("data berhasil tersimpan");
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
        <h5 className="my-3">Tambah Data Baru</h5>
        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
          <Row>
            <Col>
              <Row>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>No. Registrasi Kendaraan</Form.Label>
                    <Form.Control
                      type="text"
                      id="registrationNumber"
                      name="registrationNumber"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Nama Pemilik</Form.Label>
                    <Form.Control
                      type="text"
                      id="ownerName"
                      name="ownerName"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Merk Kendaraan</Form.Label>
                    <Form.Control
                        type="text"
                        id="vehicleBrand"
                        name="vehicleBrand"
                        onChange={handleChange}
                        required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Alamat Pemilik Kendaraan</Form.Label>
                    <Form.Control
                        as="textarea"
                        id="address"
                        name="address"
                        onInput={handleInput}
                        maxLength={500}
                        onChange={handleChange}
                        required
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Tahun Pembuatan</Form.Label>
                    <Form.Control
                        type="text"
                        id="productionYear"
                        name="productionYear"
                        onChange={handleChange}
                        required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Kapasitas Silinder</Form.Label>
                    <Form.Control
                        type="text"
                        id="cylinderCapacity"
                        name="cylinderCapacity"
                        onChange={handleChange}
                        required
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
                required
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
                        id="fuel"
                        name="fuel"
                        onChange={handleChange}
                        required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button type="submit" style={{ width: "100px" }}>
                Simpan
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
