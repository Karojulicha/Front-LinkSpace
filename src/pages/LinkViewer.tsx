import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../Hooks/useUser";
import { useEffect, useState } from "react";
import axios from "axios";
import { MenuDrawer } from "../components/MenuDrawer";

const LinkViewer = () => {
  const { pageId } = useParams();
  const { username } = useUser();
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<
    "loading" | "ok" | "redirected" | "not-found" | "error"
  >("loading");

  const navigate = useNavigate();


  const noIframeSites = [
    "github.com",
    "learn.microsoft.com",
    "techradar.com",
    "mindmeister.com",
    "imdb.com",
  ];

  useEffect(() => {
    const fetchLink = async () => {
      try {
        const res = await axios.get(
          `http://localhost:7520/api/UserLinks/${username}`
        );
        const linkUrl = res.data.links[pageId!];

        if (!linkUrl) {
          setStatus("not-found");
          return;
        }

        const shouldRedirect = noIframeSites.some((domain) =>
          linkUrl.includes(domain)
        );

        if (shouldRedirect) {
          window.open(linkUrl, "_blank");
          setStatus("redirected");
        } else {
          setUrl(linkUrl);
          setStatus("ok");
        }
      } catch {
        setStatus("error");
      }
    };

    fetchLink();
  }, [username, pageId]);

  useEffect(() => {
    if (status === "redirected" || status === "error") {
      navigate("/dashboard");
    }
  }, [status]);

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh", position: "relative" }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, zIndex: 10 }}>
        <MenuDrawer />
      </div>

      {status === "not-found" && (
        <h3 className="text-danger">Link no encontrado</h3>
      )}

      {status === "loading" && <p className="text-light">Cargando...</p>}

      {status === "ok" && url && (
        <iframe
          src={url}
          title="Contenido"
          width="100%"
          height="100%"
          style={{ border: "none" }}
        />
      )}
    </div>
  );
};

export default LinkViewer;
