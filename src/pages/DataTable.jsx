import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  IoSwapHorizontal, IoServer, IoCloudDownload, IoSpeedometer, 
  IoPulse, IoStatsChart, IoTime, IoAlertCircleOutline, 
  IoAnalytics, IoFingerPrint, IoKey, IoBusiness 
} from 'react-icons/io5';
import { db } from '../firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const InputField = ({ icon, name, value, onChange, type = 'number' }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <div className="absolute top-3 left-3 text-gray-400">{icon}</div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-2 pl-10 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={name.replace(/_/g, ' ')}
      />
    </motion.div>
  );
};

const initialFormState = {
  src_bytes: '',
  srv_count: '',
  dst_host_srv_count: '',
  dst_bytes: '',
  dst_host_same_src_port_rate: '',
  hot: '',
  dst_host_count: '',
  duration: '',
  dst_host_srv_rerror_rate: '',
  dst_host_rerror_rate: '',
  flag_type: '',
  companyname: '',
  prediction: ''
};

const DataTable = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [currentId, setCurrentId] = useState(null);
  const [viewMode, setViewMode] = useState('table');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, 'networkData'));
    setData(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentId) {
      await updateDoc(doc(db, 'networkData', currentId), formData);
    } else {
      await addDoc(collection(db, 'networkData'), formData);
    }
    resetForm();
    fetchData();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'networkData', id));
    fetchData();
  };

  const handleEdit = (item) => {
    setFormData(item);
    setCurrentId(item.id);
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setCurrentId(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-xl mb-8 shadow-xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <InputField
            icon={<IoSwapHorizontal />}
            name="src_bytes"
            value={formData.src_bytes}
            onChange={(e) => setFormData({ ...formData, src_bytes: e.target.value })}
          />
          <InputField
            icon={<IoServer />}
            name="srv_count"
            value={formData.srv_count}
            onChange={(e) => setFormData({ ...formData, srv_count: e.target.value })}
          />
          <InputField
            icon={<IoAnalytics />}
            name="dst_host_srv_count"
            value={formData.dst_host_srv_count}
            onChange={(e) => setFormData({ ...formData, dst_host_srv_count: e.target.value })}
          />
          <InputField
            icon={<IoCloudDownload />}
            name="dst_bytes"
            value={formData.dst_bytes}
            onChange={(e) => setFormData({ ...formData, dst_bytes: e.target.value })}
          />
          <InputField
            icon={<IoSpeedometer />}
            name="dst_host_same_src_port_rate"
            value={formData.dst_host_same_src_port_rate}
            onChange={(e) => setFormData({ ...formData, dst_host_same_src_port_rate: e.target.value })}
          />
          <InputField
            icon={<IoPulse />}
            name="hot"
            value={formData.hot}
            onChange={(e) => setFormData({ ...formData, hot: e.target.value })}
          />
          <InputField
            icon={<IoStatsChart />}
            name="dst_host_count"
            value={formData.dst_host_count}
            onChange={(e) => setFormData({ ...formData, dst_host_count: e.target.value })}
          />
          <InputField
            icon={<IoTime />}
            name="duration"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
          />
          <InputField
            icon={<IoFingerPrint />}
            name="dst_host_srv_rerror_rate"
            value={formData.dst_host_srv_rerror_rate}
            onChange={(e) => setFormData({ ...formData, dst_host_srv_rerror_rate: e.target.value })}
          />
          <InputField
            icon={<IoKey />}
            name="dst_host_rerror_rate"
            value={formData.dst_host_rerror_rate}
            onChange={(e) => setFormData({ ...formData, dst_host_rerror_rate: e.target.value })}
          />
          <InputField
            icon={<IoAlertCircleOutline className="transform rotate-45" />}
            name="flag_type"
            value={formData.flag_type}
            onChange={(e) => setFormData({ ...formData, flag_type: e.target.value })}
            type="text"
          />
          <InputField
            icon={<IoBusiness />}
            name="companyname"
            value={formData.companyname}
            onChange={(e) => setFormData({ ...formData, companyname: e.target.value })}
            type="text"
          />
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute top-3 left-3 text-gray-400"><IoAlertCircleOutline /></div>
            <select
              value={formData.prediction}
              onChange={(e) => setFormData({ ...formData, prediction: e.target.value })}
              className="w-full p-2 pl-10 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Prediction</option>
              <option value="Normal">Normal</option>
              <option value="Anomaly">Anomaly</option>
            </select>
          </motion.div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-blue-600 py-3 rounded-lg font-semibold"
          type="submit"
        >
          {currentId ? 'Update' : 'Submit'}
        </motion.button>
      </motion.form>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setViewMode('table')}
          className={`px-4 py-2 rounded-lg ${viewMode === 'table' ? 'bg-blue-600' : 'bg-gray-700'}`}
        >
          Table View
        </button>
        <button
          onClick={() => setViewMode('card')}
          className={`px-4 py-2 rounded-lg ${viewMode === 'card' ? 'bg-blue-600' : 'bg-gray-700'}`}
        >
          Card View
        </button>
      </div>

      {viewMode === 'table' ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-800 rounded-xl overflow-hidden shadow-xl overflow-x-auto"
        >
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="p-4 text-left">Company</th>
                <th className="p-4 text-left">Prediction</th>
                <th className="p-4 text-left">Source Bytes</th>
                <th className="p-4 text-left">Service Count</th>
                <th className="p-4 text-left">Dst Host Srv Count</th>
                <th className="p-4 text-left">Dst Bytes</th>
                <th className="p-4 text-left">Same Port Rate</th>
                <th className="p-4 text-left">Hot</th>
                <th className="p-4 text-left">Dst Host Count</th>
                <th className="p-4 text-left">Duration</th>
                <th className="p-4 text-left">Srv Error Rate</th>
                <th className="p-4 text-left">Rerror Rate</th>
                <th className="p-4 text-left">Flag Type</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {data.map((item) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="border-t border-gray-700"
                  >
                    <td className="p-4">{item.companyname}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded ${item.prediction === 'Anomaly' ? 'bg-red-500' : 'bg-green-500'}`}>
                        {item.prediction}
                      </span>
                    </td>
                    <td className="p-4">{item.src_bytes}</td>
                    <td className="p-4">{item.srv_count}</td>
                    <td className="p-4">{item.dst_host_srv_count}</td>
                    <td className="p-4">{item.dst_bytes}</td>
                    <td className="p-4">{item.dst_host_same_src_port_rate}</td>
                    <td className="p-4">{item.hot}</td>
                    <td className="p-4">{item.dst_host_count}</td>
                    <td className="p-4">{item.duration}</td>
                    <td className="p-4">{item.dst_host_srv_rerror_rate}</td>
                    <td className="p-4">{item.dst_host_rerror_rate}</td>
                    <td className="p-4">{item.flag_type}</td>
                    <td className="p-4 space-x-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        Delete
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {data.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-gray-700 p-4 rounded-lg"
              >
                <h3 className="text-lg font-semibold mb-2">{item.companyname}</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="text-gray-400">Prediction:</span> <span className={`${item.prediction === 'Anomaly' ? 'text-red-400' : 'text-green-400'}`}>{item.prediction}</span></p>
                  <p><span className="text-gray-400">Source Bytes:</span> {item.src_bytes}</p>
                  <p><span className="text-gray-400">Service Count:</span> {item.srv_count}</p>
                  <p><span className="text-gray-400">Duration:</span> {item.duration}</p>
                  <p><span className="text-gray-400">Flag Type:</span> {item.flag_type}</p>
                </div>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-400 hover:text-blue-300 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default DataTable;