import React, { useEffect, useState } from "react";
import { Button, Card, Container, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { BsFillFilePersonFill} from "react-icons/bs";
import { API } from "../config/api";

export default function DetailPages() {
  let navigate = useNavigate();
  const { id } = useParams();

  const [fachDetail, setDetail] = useState([]);
  useEffect(() => {
    const fachDetail = async () => {
      try {
        const response = await API.get("/data/" + id);
        setDetail(response.data);
      } catch (error) {
      }
    };
    fachDetail();
  }, [setDetail]);

  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div>
      <Container className="mt-3">
        <h3>
          <span>
          <BsFillFilePersonFill style={{ width: "30px" }} className="m-3"/>
          </span>
          Aplikasi Data Pribadi
        </h3>
        <h5 className="my-3">Detail Data Pribadi</h5>
        <div className="d-flex justify-content-center">
          <Card className="bg-detail">
            <Card.Body>
              <Table>
              <h5>
              <tr>
              <th>NIK :</th>
              <th>{fachDetail.registrationNumber}</th>
              </tr>
              <tr>
              <th>Nama Lengkap : </th>
              <th>{fachDetail.ownerName}</th>
              </tr>
              <tr>
              <th>Umur : </th>
              <th>{getAge(fachDetail.birth)}</th>
              </tr>
              <tr>
              <th>Tanggal Lahir:</th>
              <th>{fachDetail.birth}</th>
              </tr>
              <tr>
              <th>Jenis Kelamin :</th>
              <th>{fachDetail.gender}</th>
              </tr>
              <tr>
              <th>Alamat :</th>
              <th>{fachDetail.address}</th>
              </tr>
              </h5>
              </Table>
            </Card.Body>
          </Card>
        </div>
        <Button onClick={handleBack} className="my-3">
          Kembali
        </Button>
      </Container>
    </div>
  );
}
