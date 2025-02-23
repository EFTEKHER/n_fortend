import React from "react";
import { 
  FaTable, FaFileCsv, FaClock, FaServer, FaFlag, FaUpload, FaDownload, 
  FaSync, FaShieldAlt, FaCodeBranch, FaNetworkWired, FaCloud, FaCogs, 
  FaGlobe, FaBug, FaDatabase, FaLock, FaUserShield, FaExclamationTriangle,
  FaInfoCircle, FaRadiation, FaCrosshairs, FaShieldVirus
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

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
  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const SectionHeader = ({ icon: Icon, children }) => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
    
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={fadeInVariants}
        className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent text-center mb-8 flex items-center justify-center gap-3"
      >
        <Icon className="text-purple-500" />
        {children}
      </motion.div>
    );
  };

  const FeatureCard = ({ icon: Icon, title, children }) => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={fadeInVariants}
        className="p-6 bg-white bg-opacity-5 backdrop-blur-lg rounded-xl border border-red-500/30 hover:border-red-500/60 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/10"
      >
        <div className="flex items-start gap-4">
          <div className="p-3 bg-red-500/10 rounded-lg">
            <Icon className="text-2xl text-red-500" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-red-400 mb-2">{title}</h3>
            <p className="text-black text-sm leading-relaxed">{children}</p>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-7xl space-y-16">
        {/* About Section */}
        <section>
          <SectionHeader icon={FaShieldVirus}>Network Security Insights</SectionHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard icon={FaNetworkWired} title="Network Composition">
              Contains 41 features across 25,194 entries with detailed TCP/IP attributes and protocol analysis.
            </FeatureCard>
            <FeatureCard icon={FaRadiation} title="Threat Coverage">
              Simulates military network intrusions including DoS, U2R, and R2L attack vectors.
            </FeatureCard>
            <FeatureCard icon={FaDatabase} title="Structured Data">
              Labeled attack/normal traffic optimized for machine learning implementations.
            </FeatureCard>
            <FeatureCard icon={FaCloud} title="Cloud Ready">
              Perfect for developing cloud-based threat detection systems and hybrid infrastructure security.
            </FeatureCard>
            <FeatureCard icon={FaCrosshairs} title="Attack Patterns">
              Detailed reconnaissance patterns with service request metrics and port scanning behavior.
            </FeatureCard>
            <FeatureCard icon={FaBug} title="Anomaly Detection">
              Comprehensive error rate tracking and connection flag analysis for suspicious activity identification.
            </FeatureCard>
          </div>
        </section>

        {/* Data Table Section */}
        <section>
          <SectionHeader icon={FaTable}>Dataset Preview</SectionHeader>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-red-500/30 shadow-xl overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm md:text-base">
                <thead className="bg-red-500/10">
                  <tr>
                    {headers.map((header, index) => (
                      <th 
                        key={index}
                        className="px-4 py-3 text-red-400 font-semibold text-left border-b border-red-500/30"
                      >
                        <div className="flex items-center gap-2">
                          <FaInfoCircle className="text-red-500/80" />
                          {header.toUpperCase()}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dataset.map((row, rowIndex) => (
                    <tr 
                      key={rowIndex}
                      className="hover:bg-red-500/5 transition-colors border-b border-red-500/10 last:border-0"
                    >
                      {headers.map((header, colIndex) => (
                        <td 
                          key={colIndex}
                          className={`px-4 py-3 ${row.class === 'anomaly' ? 'text-red-400' : 'text-gray-300'}`}
                        >
                          {row[header]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default Dataset;