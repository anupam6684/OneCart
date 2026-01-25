import React from "react";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";

export default function OurPolicy() {
  return (
    <div className="row text-center py-4 mb-5 g-4">
      <div className="col-12 col-md-4">
        <AutorenewIcon fontSize="large" className="mb-2" />
        <p className="fw-semibold fs-5 mb-1">Easy Exchange Policy</p>
        <p className="fs-6 text-muted mb-0">
          We offer hassle free exchange policy
        </p>
      </div>

      <div className="col-12 col-md-4">
        <TaskAltIcon fontSize="large" className="mb-2" />
        <p className="fw-semibold fs-5 mb-1">7 Days Return Policy</p>
        <p className="fs-6 text-muted mb-0">
          We provide 7 days free return policy
        </p>
      </div>

      <div className="col-12 col-md-4">
        <HeadsetMicIcon fontSize="large" className="mb-2" />
        <p className="fw-semibold fs-5 mb-1">Best Customer Support</p>
        <p className="fs-6 text-muted mb-0">We provide 24/7 customer support</p>
      </div>
    </div>
  );
}
