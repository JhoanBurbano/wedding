import { IFamilies, IInvites, IResposnseCSV, IUpdateName } from "../interfaces";
import { useCallback, useEffect, useState } from "react";

import axios from "axios";

const useFamilies = () => {
  const url = process.env.REACT_APP_URL as string;
  const [invite, setInvite] = useState<IInvites | {}>({});
  const [family, setFamily] = useState<IFamilies | {}>({});
  const [families, setFamilies] = useState<Array<IFamilies>>([]);

  const getFamilies = useCallback(async () => {
    try {
      const { data } = await axios.get<Array<IFamilies>>(`${url}families`);
      setFamilies(data);
    } catch (error) {
      console.log("error", error);
    }
  }, [setFamilies, url]);

  async function getFamily(id: string) {
    try {
      const { data } = await axios.get<IInvites>(`${url}families/${id}`);
      setFamily(data);
    } catch (error) {
      console.log("error", error);
    }
  }

  async function getInvite(id: string) {
    try {
      const { data } = await axios.get<IInvites>(`${url}invites/${id}`);
      setInvite(data);
    } catch (error) {
      console.log("error", error);
    }
  }

  async function createFamily(family: IUpdateName) {
    try {
      await axios.post<IFamilies>(`${url}families`, {
        ...family,
      });
      getFamilies();
    } catch (error) {
      console.log("error", error);
    }
  }

  async function addMemeber(invite: IInvites) {
    try {
      await axios.post<IFamilies>(`${url}${invite.family}`, {
        ...invite,
      });
      getFamilies();
    } catch (error) {
      console.log("error", error);
    }
  }

  async function deleteMember(idFamily: string, idInvite: string) {
    try {
      await axios.delete<IFamilies>(`${url}$families/{idFamily}/${idInvite}`);
      getFamilies();
    } catch (error) {
      console.log("error", error);
    }
  }

  async function updateFamily(_id: string, updates: IUpdateName) {
    try {
      await axios.put<IInvites>(`${url}families/${_id}`, { ...updates });
      getFamilies();
    } catch (error) {
      console.log("error", error);
    }
  }

  async function deleteFamily(_id: string) {
    try {
      await axios.delete<IFamilies>(`${url}families/${_id}`);
      getFamilies();
    } catch (error) {
      console.log("error", error);
    }
  }

  async function getCSV(): Promise<string | undefined> {
    try {
      const {
        data: { url: base64 },
      } = await axios.get<IResposnseCSV>(`${url}families/datamerge`);
      return base64;
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    getFamilies();
  }, []);

  return {
    families,
    family,
    invite,
    getFamilies,
    getFamily,
    createFamily,
    updateFamily,
    deleteFamily,
    addMemeber,
    deleteMember,
    getInvite,
    getCSV,
  };
};

export default useFamilies;
