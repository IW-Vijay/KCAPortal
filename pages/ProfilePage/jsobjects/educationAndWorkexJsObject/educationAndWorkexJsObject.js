export default {
    async educations() {
        // Reset the Educations widget before fetching new data
        resetWidget(Educations);

        try {
            await fetchEducation.run();
            let educationList = fetchEducation.data;

            let educationWithNames = await Promise.all(educationList.map(async (education) => {
                try {
                    await fetchInstitutionName.run({ "institution_id": education.institution_id });

                    return {
                        ...education,
                        institution_name: fetchInstitutionName.data[0]?.name || 'Unknown',
                        isschool: fetchInstitutionName.data[0]?.isschool || false,
                        institution: fetchInstitutionName.data
                    };
                } catch (error) {
                    console.error("Error fetching institution name:", error);
                    return {
                        ...education,
                        institution_name: 'Unknown',
                        isschool: false,
                        institution: []
                    };
                }
            }));

            return { "education": educationWithNames };

        } catch (error) {
            console.error("Error fetching education list:", error);
            return { "education": [] };  // Returning an empty list if there's an error
        }
    },

    async workexs() {
        // Reset the Workex widget before fetching new data
        resetWidget(Workexs);

        try {
            await fetchWorkex.run();
            let workexList = fetchWorkex.data;

            let workexWithNames = await Promise.all(workexList.map(async (workex) => {
                try {
                    await fetchOrganizationName.run({ "organization_id": workex.organization_id });

                    return {
                        ...workex,
                        organization_name: fetchOrganizationName.data[0]?.name || 'Unknown',
                        institution_id: fetchOrganizationName.data[0]?.institution_id,
                        organization: fetchOrganizationName.data
                    };
                } catch (error) {
                    console.error("Error fetching organization name:", error);
                    return {
                        ...workex,
                        organization_name: 'Unknown',
                        institution_id: null,
                        organization: []
                    };
                }
            }));

            return { "workex": workexWithNames };

        } catch (error) {
            console.error("Error fetching work experience list:", error);
            return { "workex": [] };  // Returning an empty list if there's an error
        }
    }
};
