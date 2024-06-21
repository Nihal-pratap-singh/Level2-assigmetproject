import React, { useState } from 'react';


const JobApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    applyingFor: '',
    relevantExperience: '',
    portfolioURL: '',
    managementExperience: '',
    additionalSkills: [],
    preferredInterviewTime: ''
  });

  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prevState) => {
        const newSkills = checked
          ? [...prevState.additionalSkills, value]
          : prevState.additionalSkills.filter((skill) => skill !== value);
        return { ...prevState, additionalSkills: newSkills };
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phoneNumber || isNaN(formData.phoneNumber)) newErrors.phoneNumber = 'Phone Number is invalid';
    if (!formData.applyingFor) newErrors.applyingFor = 'Applying for Position is required';
    if ((formData.applyingFor === 'Developer' || formData.applyingFor === 'Designer') && (!formData.relevantExperience || isNaN(formData.relevantExperience) || formData.relevantExperience <= 0)) {
      newErrors.relevantExperience = 'Relevant Experience must be greater than 0';
    }
    if (formData.applyingFor === 'Designer' && (!formData.portfolioURL || !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(formData.portfolioURL))) {
      newErrors.portfolioURL = 'Portfolio URL is invalid';
    }
    if (formData.applyingFor === 'Manager' && !formData.managementExperience) newErrors.managementExperience = 'Management Experience is required';
    if (formData.additionalSkills.length === 0) newErrors.additionalSkills = 'At least one skill must be selected';
    if (!formData.preferredInterviewTime) newErrors.preferredInterviewTime = 'Preferred Interview Time is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmittedData(formData);
    }
  };

  const { applyingFor } = formData;

  return (
    <div className="card">
      <h1>Job Application Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
          <p>{errors.fullName}</p>
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
          <p>{errors.email}</p>
        </div>
        <div>
          <label>Phone Number</label>
          <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
          <p>{errors.phoneNumber}</p>
        </div>
        <div>
          <label>Applying for Position</label>
          <select name="applyingFor" value={formData.applyingFor} onChange={handleChange}>
            <option value="">Select...</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Manager">Manager</option>
          </select>
          <p>{errors.applyingFor}</p>
        </div>
        {(applyingFor === 'Developer' || applyingFor === 'Designer') && (
          <div>
            <label>Relevant Experience (years)</label>
            <input type="number" name="relevantExperience" value={formData.relevantExperience} onChange={handleChange} />
            <p>{errors.relevantExperience}</p>
          </div>
        )}
        {applyingFor === 'Designer' && (
          <div>
            <label>Portfolio URL</label>
            <input type="text" name="portfolioURL" value={formData.portfolioURL} onChange={handleChange} />
            <p>{errors.portfolioURL}</p>
          </div>
        )}
        {applyingFor === 'Manager' && (
          <div>
            <label>Management Experience</label>
            <input type="text" name="managementExperience" value={formData.managementExperience} onChange={handleChange} />
            <p>{errors.managementExperience}</p>
          </div>
        )}
        <div>
          <label>Additional Skills</label>
          <div>
            <label><input type="checkbox" value="JavaScript" onChange={handleChange} checked={formData.additionalSkills.includes('JavaScript')} /> JavaScript</label>
            <label><input type="checkbox" value="CSS" onChange={handleChange} checked={formData.additionalSkills.includes('CSS')} /> CSS</label>
            <label><input type="checkbox" value="Python" onChange={handleChange} checked={formData.additionalSkills.includes('Python')} /> Python</label>
          </div>
          <p>{errors.additionalSkills}</p>
        </div>
        <div>
          <label>Preferred Interview Time</label>
          <input type="datetime-local" name="preferredInterviewTime" value={formData.preferredInterviewTime} onChange={handleChange} />
          <p>{errors.preferredInterviewTime}</p>
        </div>
        <button type="submit">Submit</button>
      </form>
      {submittedData && (
        <div>
          <h2>Submitted Data</h2>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default JobApplicationForm;
