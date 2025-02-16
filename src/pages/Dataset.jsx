import React from "react";
import { 
  FaTable, FaFileCsv, FaClock, FaServer, FaFlag, FaUpload, FaDownload, 
  FaSync, FaShieldAlt, FaCodeBranch,FaNetworkWired, FaCloud, FaCogs, FaGlobe, FaBug, FaDatabase, FaLock, FaUserShield, FaExclamationTriangle 
} from "react-icons/fa";

const dataset = [
  {
    duration: 0,
    protocol_type: "tcp",
    service: "ftp_data",
    flag: "SF",
    src_bytes: 491,
    dst_bytes: 0,
    srv_count: 2,
    dst_host_srv_count: 25,
    dst_host_same_src_port_rate: 0.17,
    dst_host_rerror_rate: 0.05,
    dst_host_srv_rerror_rate: 0.0,
    class: "normal"
  },
  {
    duration: 0,
    protocol_type: "udp",
    service: "other",
    flag: "SF",
    src_bytes: 146,
    dst_bytes: 0,
    srv_count: 1,
    dst_host_srv_count: 1,
    dst_host_same_src_port_rate: 0.88,
    dst_host_rerror_rate: 0.0,
    dst_host_srv_rerror_rate: 0.0,
    class: "normal"
  },
  {
    duration: 0,
    protocol_type: "tcp",
    service: "private",
    flag: "S0",
    src_bytes: 0,
    dst_bytes: 0,
    srv_count: 6,
    dst_host_srv_count: 26,
    dst_host_same_src_port_rate: 0.0,
    dst_host_rerror_rate: 0.0,
    dst_host_srv_rerror_rate: 0.0,
    class: "anomaly"
  },
  {
    duration: 0,
    protocol_type: "tcp",
    service: "http",
    flag: "SF",
    src_bytes: 232,
    dst_bytes: 8153,
    srv_count: 5,
    dst_host_srv_count: 255,
    dst_host_same_src_port_rate: 0.03,
    dst_host_rerror_rate: 0.0,
    dst_host_srv_rerror_rate: 0.01,
    class: "normal"
  },
  {
    duration: 0,
    protocol_type: "tcp",
    service: "http",
    flag: "SF",
    src_bytes: 199,
    dst_bytes: 420,
    srv_count: 32,
    dst_host_srv_count: 255,
    dst_host_same_src_port_rate: 0.0,
    dst_host_rerror_rate: 0.0,
    dst_host_srv_rerror_rate: 0.0,
    class: "normal"
  },
  {
    duration: 0,
    protocol_type: "tcp",
    service: "private",
    flag: "REJ",
    src_bytes: 0,
    dst_bytes: 0,
    srv_count: 19,
    dst_host_srv_count: 19,
    dst_host_same_src_port_rate: 0.0,
    dst_host_rerror_rate: 1.0,
    dst_host_srv_rerror_rate: 1.0,
    class: "anomaly"
  },
  {
    duration: 0,
    protocol_type: "tcp",
    service: "private",
    flag: "S0",
    src_bytes: 0,
    dst_bytes: 0,
    srv_count: 9,
    dst_host_srv_count: 9,
    dst_host_same_src_port_rate: 0.0,
    dst_host_rerror_rate: 0.0,
    dst_host_srv_rerror_rate: 0.0,
    class: "anomaly"
  },
  {
    duration: 0,
    protocol_type: "tcp",
    service: "private",
    flag: "S0",
    src_bytes: 0,
    dst_bytes: 0,
    srv_count: 16,
    dst_host_srv_count: 15,
    dst_host_same_src_port_rate: 0.0,
    dst_host_rerror_rate: 0.0,
    dst_host_srv_rerror_rate: 0.0,
    class: "anomaly"
  },
  {
    duration: 0,
    protocol_type: "tcp",
    service: "remote_job",
    flag: "S0",
    src_bytes: 0,
    dst_bytes: 0,
    srv_count: 23,
    dst_host_srv_count: 23,
    dst_host_same_src_port_rate: 0.0,
    dst_host_rerror_rate: 0.0,
    dst_host_srv_rerror_rate: 0.0,
    class: "anomaly"
  },
  {
    duration: 0,
    protocol_type: "tcp",
    service: "private",
    flag: "S0",
    src_bytes: 0,
    dst_bytes: 0,
    srv_count: 8,
    dst_host_srv_count: 13,
    dst_host_same_src_port_rate: 0.0,
    dst_host_rerror_rate: 0.0,
    dst_host_srv_rerror_rate: 0.0,
    class: "anomaly"
  },
  {
    duration: 0,
    protocol_type: "tcp",
    service: "ftp_data",
    flag: "SF",
    src_bytes: 491,
    dst_bytes: 0,
    srv_count: 2,
    dst_host_srv_count: 25,
    dst_host_same_src_port_rate: 0.17,
    dst_host_rerror_rate: 0.05,
    dst_host_srv_rerror_rate: 0.0,
    class: "normal"
  },
  {
    duration: 0,
    protocol_type: "udp",
    service: "other",
    flag: "SF",
    src_bytes: 146,
    dst_bytes: 0,
    srv_count: 1,
    dst_host_srv_count: 1,
    dst_host_same_src_port_rate: 0.88,
    dst_host_rerror_rate: 0.0,
    dst_host_srv_rerror_rate: 0.0,
    class: "normal"
  }
];

const Dataset = () => {
  const headers = Object.keys(dataset[0]);

  return( <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 py-12">
    <div className="w-full max-w-6xl p-8 bg-black border-2 border-red-600 rounded-lg shadow-lg cyber-glow mb-12">
    <h1 className="text-4xl font-extrabold text-red-500 glow-text text-center flex items-center justify-center mb-6">
      <FaNetworkWired className="mr-2 text-5xl" size={24} />
      About the Intrusion Detection Dataset
    </h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <p className="text-gray-300 text-lg flex items-center">
            <FaCodeBranch className="mr-2 text-red-500" />
            Dataset consists of 41 features and 25194, including TCP/IP attributes, protocol types, and network flags.
          </p>
      <p className="text-gray-300 text-lg flex items-center">
        <FaGlobe className="mr-2 text-red-500" size={20} />
        The dataset consists of a wide variety of intrusions simulated in a military network environment.
      </p>
      <p className="text-gray-300 text-lg flex items-center">
        <FaShieldAlt className="mr-2 text-red-500" size={20} />
        This dataset helps in detecting unauthorized access attempts and suspicious activities in network traffic.
      </p>
      <p className="text-gray-300 text-lg flex items-center">
        <FaBug className="mr-2 text-red-500" size={20} />
        It includes various types of cyber attacks such as Denial of Service (DoS), User to Root (U2R), and Remote to Local (R2L).
      </p>
      <p className="text-gray-300 text-lg flex items-center">
        <FaLock className="mr-2 text-red-500" size={20} />
        Network security researchers use this dataset to improve firewall and Intrusion Detection System (IDS) capabilities.
      </p>
      <p className="text-gray-300 text-lg flex items-center">
        <FaDatabase className="mr-2 text-red-500" size={20} />
        The dataset is structured with labeled attack and normal traffic, making it ideal for supervised learning models.
      </p>
      <p className="text-gray-300 text-lg flex items-center">
        <FaNetworkWired className="mr-2 text-red-500" size={20} />
        It captures real-world network connections, containing a mix of normal and attack traffic.
      </p>
      <p className="text-gray-300 text-lg flex items-center">
        <FaUserShield className="mr-2 text-red-500" size={20} />
        Helps cybersecurity professionals develop advanced intrusion detection mechanisms to protect sensitive data.
      </p>
      <p className="text-gray-300 text-lg flex items-center">
        <FaFileCsv className="mr-2 text-red-500" size={20} />
        The dataset is available in CSV format, containing detailed logs of network traffic for analysis.
      </p>
      <p className="text-gray-300 text-lg flex items-center">
        <FaExclamationTriangle className="mr-2 text-red-500" size={20} />
        Each network session is labeled as either normal or anomalous to help in automated detection systems.
      </p>
      <p className="text-gray-300 text-lg flex items-center">
        <FaCloud className="mr-2 text-red-500" size={20} />
        It can be used for cloud-based threat detection and cybersecurity research in cloud environments.
      </p>
      <p className="text-gray-300 text-lg flex items-center">
        <FaCogs className="mr-2 text-red-500" size={20} />
        This dataset enables the development of AI-driven cybersecurity solutions that improve network resilience.
      </p>
      <p className="text-gray-300 text-lg flex items-center">
        <FaClock className="mr-2 text-red-500" size={20} />
        Duration: The length of the network session, measured in seconds. This connection was immediately dropped (0 seconds).
      </p>
      <p className="text-gray-300 text-lg flex items-center">
        <FaNetworkWired className="mr-2 text-red-500" size={20} />
        Protocol Type: The communication protocol used in this session. It uses TCP ("tcp").
      </p>
      <p className="text-gray-300 text-lg flex items-center">
        <FaServer className="mr-2 text-red-500" size={20} />
        Service: "private" refers to an unknown or custom service, which might be suspicious.
      </p>
      <p className="text-gray-300 text-lg flex items-center">
        <FaFlag className="mr-2 text-red-500" size={20} />
        Flag: "S0" means the connection was initiated but never completed. The destination did not respond, which is common in scanning attacks.
      </p>
      <p className="text-gray-300 text-lg flex items-center">
        <FaUpload className="mr-2 text-red-500" size={20} />
        Bytes Sent: 0 - No data was sent from the source.
      </p>
      <p className="text-gray-300 text-lg flex items-center">
        <FaDownload className="mr-2 text-red-500" size={20} />
        Bytes Received: 0 - No data was received at the destination.
      </p>
      <p className="text-gray-300 text-lg flex items-center">
        <FaSync className="mr-2 text-red-500" size={20} />
        Service Request Count: 8 - The attacker made multiple attempts to connect to the same service.
      </p>
      <p className="text-gray-300 text-lg flex items-center">
        <FaShieldAlt className="mr-2 text-red-500" size={20} />
        Destination Host Service Count: 13 - There were multiple connection attempts targeting the same service on the host.
      </p>
      <p className="text-gray-300 text-lg flex items-center">
        <FaBug className="mr-2 text-red-500" size={20} />
        Same Source Port Rate: 0.0 - The attacker did not reuse the same source port, which may indicate random probing.
      </p>
      <p className="text-gray-300 text-lg flex items-center">
        <FaExclamationTriangle className="mr-2 text-red-500" size={20} />
        Error Rate: 0.0 - No immediate errors were logged, but the "S0" flag suggests an unsuccessful attempt.
      </p>
      <p className="text-gray-300 text-lg flex items-center">
        <FaUserShield className="mr-2 text-red-500" size={20} />
        Class: "anomaly" - This record is classified as an attack, possibly a network scan or reconnaissance attempt.
      </p>
    </div>
  </div>

  <div className="w-full max-w-6xl p-8 bg-black border-2 border-red-600 rounded-lg shadow-lg cyber-glow">
    <h1 className="text-4xl font-extrabold text-red-500 glow-text text-center flex items-center justify-center mb-6">
      <FaTable className="mr-2 text-5xl" />
      Intrusion Detection Dataset with Sample 12 rows
    </h1>
    <div className="overflow-x-auto overflow-y-auto max-h-[500px] border border-red-600 rounded-lg">
      <table className="w-full text-left border-collapse">
        <thead className="bg-red-800/80 text-white">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="p-3 border border-red-600">
                {header.toUpperCase()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-gray-300">
          {dataset.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-red-900/50 transition">
              {headers.map((header, colIndex) => (
                <td key={colIndex} className="p-3 border border-red-600">
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>
);
};

export default Dataset;
