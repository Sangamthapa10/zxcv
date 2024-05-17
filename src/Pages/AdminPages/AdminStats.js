import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../Components/Context";
import AdminSidebar from "../../Components/AdminComponents/AdminSidebar";
import { Authaxios } from "../../Components/Axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";

const AdminStats = () => {
  const { chartdata, setchartdata, setmailmodal, setmailtext } =
    useGlobalContext();
  const [loading, setloading] = useState(false);

  useEffect(() => {
    let tok = localStorage.getItem("axynghkwngasd");
    if (chartdata.length === 0) {
      if (tok) {
        setmailtext("loading");
        setmailmodal(true);
        Authaxios.get("/account/ov").then((res) => {
          setchartdata(res.data);
          setmailmodal(false);
          setloading(true);
        });
      }
    } else {
      setloading(true);
    }
  }, [setchartdata, chartdata.length, setmailmodal, setmailtext]);
  function convertdatestr(date) {
    let ax = new Date(date);
    let a = ax.toDateString();
    const four = a.split(" ")[1] + " " + a.split(" ")[3];

    return four;
  }
  return (
    <div className="admin_dash">
      <AdminSidebar />
      {loading && (
        <div style={{ marginTop: "4vh" }}>
          <div
            style={{
              width: "95%",
              display: "grid",
              gridGap: "15px",
              margin: "auto",
              padding: "15px",
              background: "#fff",
            }}
          >
            <h3>Monthly Details</h3>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Month</TableCell>
                  <TableCell>Total Bookings</TableCell>
                  <TableCell>Average days stayed</TableCell>
                  <TableCell>Total Money</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {chartdata.month_full_details.map((mapped, i) => {
                  return (
                    <TableRow key={i + 1}>
                      <TableCell>
                        {convertdatestr(mapped.monthly_details)}
                      </TableCell>
                      <TableCell>{mapped.count}</TableCell>
                      <TableCell>{mapped.days_stayed}</TableCell>
                      <TableCell>Npr {mapped.total_price}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminStats;
